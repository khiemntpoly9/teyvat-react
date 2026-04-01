<?php

namespace Khiemnt\TakiAuth\Http\Controllers;

use Illuminate\Routing\Controller;
use Laravel\Socialite\Facades\Socialite;
use Khiemnt\TakiAuth\Services\TakiAuthService;
use Illuminate\Support\Facades\Auth;

class SocialAuthController extends Controller
{
    protected $authService;

    public function __construct(TakiAuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Chuyển hướng người dùng tới Provider (Google, Facebook...)
     */
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Xử lý Callback từ Provider.
     */
    public function callback($provider)
    {
        try {
            $socialiteUser = Socialite::driver($provider)->user();
            
            $user = $this->authService->handleSocialCallback($provider, $socialiteUser);

            Auth::login($user, true);

            // Chuyển hướng về trang dashboard hoặc home
            return redirect()->intended('/dashboard');

        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Đăng nhập thất bại: ' . $e->getMessage());
        }
    }
}
