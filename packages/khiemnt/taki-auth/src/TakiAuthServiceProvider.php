<?php

namespace Khiemnt\TakiAuth;

use Illuminate\Support\ServiceProvider;

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
    }
}
