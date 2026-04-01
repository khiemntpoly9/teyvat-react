<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // User - Người dùng
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('username')->unique()->nullable();
            $table->string('display_name')->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('phone', 10)->nullable();
            $table->date('birthday')->nullable();
            $table->string('gender')->nullable();
            $table->timestamp('email_verified')->nullable();
            $table->string('image')->nullable();
            $table->timestamp('banned')->nullable();
            $table->boolean('is_active')->default(false);
            $table->string('banned_reason')->nullable();
            $table->timestamp('ban_expired')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });

        // Session - Phiên
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->timestamp('expires_at')->nullable();
            $table->string('token')->nullable();
            $table->timestamps();
            $table->ipAddress('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table
                ->foreignUuid('user_id')
                ->nullable()
                ->index('session_userId_idx')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->foreignUuid('impersonated_by')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index('session_lastActivity_idx');
        });

        // Account - Tài khoản
        Schema::create('accounts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('account_id');
            $table->string('provider_id');
            $table
                ->foreignUuid('user_id')
                ->index('account_userId_idx')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->text('access_token')->nullable();
            $table->text('refresh_token')->nullable();
            $table->string('token_type')->nullable();
            $table->text('id_token')->nullable();
            $table->timestamp('access_token_expires_at')->nullable();
            $table->timestamp('refresh_token_expires_at')->nullable();
            $table->string('scope')->nullable();
            $table->string('password')->nullable();
            $table->string('two_factor_secret')->nullable();
            $table->string('two_factor_recovery_code')->nullable();
            $table->timestamp('two_factor_confirmed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // Verifications - Xác thực
        Schema::create('verifications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('identifier', 255)->index('verification_identifier_idx');
            $table->text('value');
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });

        // Schema::create('sessions', function (Blueprint $table) {
        //     $table->string('id')->primary();
        //     $table->foreignId('user_id')->nullable()->index();
        //     $table->string('ip_address', 45)->nullable();
        //     $table->text('user_agent')->nullable();
        //     $table->longText('payload');
        //     $table->integer('last_activity')->index();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
