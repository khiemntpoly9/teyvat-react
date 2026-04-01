<?php

namespace Khiemnt\TakiAuth;

use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Fortify;
use Khiemnt\TakiAuth\Actions\Fortify\CreateNewUser;
use Khiemnt\TakiAuth\Actions\Fortify\ResetUserPassword;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Laravel\Fortify\Features;

class TakiAuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/taki-auth.php', 'taki-auth');
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');
        $this->loadRoutesFrom(__DIR__ . '/../routes/web.php');

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../config/taki-auth.php' => config_path('taki-auth.php'),
                __DIR__ . '/../config/services.php' => config_path('services_taki.php'), // Ví dụ nếu muốn lưu riêng
            ], 'taki-auth-config');

            $this->publishes([
                __DIR__ . '/../database/migrations' => database_path('migrations'),
            ], 'taki-auth-migrations');
        }

        $this->bootFortify();
    }

    /**
     * Cấu hình Fortify cho Package.
     */
    protected function bootFortify(): void
    {
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);

        // Định nghĩa các Views (Inertia)
        Fortify::loginView(fn (Request $request) => Inertia::render('auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'canRegister' => Features::enabled(Features::registration()),
            'status' => $request->session()->get('status'),
        ]));

        Fortify::registerView(fn () => Inertia::render('auth/register'));

        Fortify::resetPasswordView(fn (Request $request) => Inertia::render('auth/reset-password', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]));

        Fortify::requestPasswordResetLinkView(fn (Request $request) => Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::verifyEmailView(fn (Request $request) => Inertia::render('auth/verify-email', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::twoFactorChallengeView(fn () => Inertia::render('auth/two-factor-challenge'));

        Fortify::confirmPasswordView(fn () => Inertia::render('auth/confirm-password'));
    }
}
