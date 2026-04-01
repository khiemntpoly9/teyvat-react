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
        'user' => \Khiemnt\TakiAuth\Models\TakiUser::class,
    ],

    'table_names' => [
        'users' => 'users',
    ],
];
