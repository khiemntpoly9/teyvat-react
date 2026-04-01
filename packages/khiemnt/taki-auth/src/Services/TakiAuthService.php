<?php

namespace Khiemnt\TakiAuth\Services;

use Khiemnt\TakiAuth\Models\User;
use Khiemnt\TakiAuth\Models\Account;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Contracts\User as SocialiteUser;

class TakiAuthService
{
    /**
     * Tạo người dùng mới và tài khoản đi kèm.
     *
     * @param array $data
     * @return User
     */
    public function registerUser(array $data): User
    {
        return DB::transaction(function () use ($data) {
            // 1. Tạo User
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'] ?? null,
                'username' => $data['username'] ?? null,
                'display_name' => $data['display_name'] ?? $data['name'],
                'is_active' => $data['is_active'] ?? true,
            ]);

            // 2. Tạo Account (Credential account)
            Account::create([
                'user_id' => $user->id,
                'provider_id' => 'credentials',
                'account_id' => $data['email'] ?? $user->id, // Định danh đăng nhập
                'password' => $data['password'], // Hash sẽ được xử lý bởi casts trong Model Account
            ]);

            return $user;
        });
    }

    /**
     * Tài khoản xã hội (Socialite).
     */
    public function linkSocialAccount(User $user, string $provider, string $providerId, array $tokenData = []): Account
    {
        return Account::updateOrCreate(
            [
                'provider_id' => $provider,
                'account_id' => $providerId,
            ],
            [
                'user_id' => $user->id,
                'access_token' => $tokenData['access_token'] ?? null,
                'refresh_token' => $tokenData['refresh_token'] ?? null,
                'token_type' => $tokenData['token_type'] ?? null,
                'id_token' => $tokenData['id_token'] ?? null,
                'access_token_expires_at' => $tokenData['expires_at'] ?? null,
                'scope' => $tokenData['scope'] ?? null,
            ]
        );
    }

    /**
     * Xử lý callback từ Socialite và trả về User.
     *
     * @param string $provider
     * @param SocialiteUser $socialiteUser
     * @return User
     */
    public function handleSocialCallback(string $provider, SocialiteUser $socialiteUser): User
    {
        return DB::transaction(function () use ($provider, $socialiteUser) {
            // 1. Tìm xem Account này đã tồn tại chưa
            $account = Account::where('provider_id', $provider)
                ->where('account_id', $socialiteUser->getId())
                ->first();

            if ($account) {
                // Cập nhật token nếu cần
                $account->update([
                    'access_token' => $socialiteUser->token,
                    'refresh_token' => $socialiteUser->refreshToken,
                    'access_token_expires_at' => property_exists($socialiteUser, 'expiresIn') ? now()->addSeconds($socialiteUser->expiresIn) : null,
                ]);

                return $account->user;
            }

            // 2. Nếu chưa có, xem email đã có User chưa
            $user = User::where('email', $socialiteUser->getEmail())->first();

            if (!$user) {
                // 3. Nếu chưa có User -> Tạo mới
                $user = User::create([
                    'name' => $socialiteUser->getName() ?? $socialiteUser->getNickname(),
                    'email' => $socialiteUser->getEmail(),
                    'display_name' => $socialiteUser->getName(),
                    'image' => $socialiteUser->getAvatar(),
                    'is_active' => true,
                    'email_verified' => now(), // Social account thường đã xác thực email
                ]);
            }

            // 4. Tạo Account mới liên kết với User
            Account::create([
                'user_id' => $user->id,
                'provider_id' => $provider,
                'account_id' => $socialiteUser->getId(),
                'access_token' => $socialiteUser->token,
                'refresh_token' => $socialiteUser->refreshToken,
                'token_type' => 'Bearer',
                'access_token_expires_at' => property_exists($socialiteUser, 'expiresIn') ? now()->addSeconds($socialiteUser->expiresIn) : null,
            ]);

            return $user;
        });
    }
}
