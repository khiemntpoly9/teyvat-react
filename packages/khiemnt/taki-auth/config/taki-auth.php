<?php

return [
    /*
    |--------------------------------------------------------------------------
    | TakiAuth Configuration
    |--------------------------------------------------------------------------
    |
    | Cấu hình cho package TakiAuth.
    |
    */

    'models' => [
        'user' => \Khiemnt\TakiAuth\Models\User::class,
    ],

    'table_names' => [
        'users' => 'users',
    ],
];
