<?php

use Illuminate\Support\Facades\Route;
use Khiemnt\TakiAuth\Http\Controllers\SocialAuthController;

Route::middleware(['web'])->group(function () {
    // Social Authentication Routes
    Route::get('/auth/{provider}/redirect', [SocialAuthController::class, 'redirect'])
        ->name('social.redirect');

    Route::get('/auth/{provider}/callback', [SocialAuthController::class, 'callback'])
        ->name('social.callback');
});
