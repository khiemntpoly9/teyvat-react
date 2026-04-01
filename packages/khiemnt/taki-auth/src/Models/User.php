<?php

namespace Khiemnt\TakiAuth\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles, HasUuids, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'display_name',
        'email',
        'phone',
        'birthday',
        'gender',
        'email_verified',
        'image',
        'banned',
        'is_active',
        'banned_reason',
        'ban_expired',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'birthday' => 'date',
            'email_verified' => 'datetime',
            'banned' => 'datetime',
            'ban_expired' => 'datetime',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get the accounts for the user.
     */
    public function accounts(): HasMany
    {
        return $this->hasMany(Account::class);
    }

    /**
     * Get the sessions for the user.
     */
    public function sessions(): HasMany
    {
        return $this->hasMany(Session::class);
    }

    /**
     * Lấy mật khẩu để xác thực (từ bảng accounts)
     */
    public function getAuthPassword()
    {
        // Ưu tiên tài khoản có password (local account)
        return $this->accounts()->whereNotNull('password')->first()?->password;
    }

    /**
     * Tài khoản mặc định (ví dụ: 'credentials')
     */
    public function primaryAccount(): HasOne
    {
        return $this->hasOne(Account::class)->where('provider_id', 'credentials');
    }
}
