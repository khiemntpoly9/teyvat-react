<?php

namespace Khiemnt\TakiAuth\Actions\Fortify;

use Khiemnt\TakiAuth\Concerns\PasswordValidationRules;
use Khiemnt\TakiAuth\Concerns\ProfileValidationRules;
use Khiemnt\TakiAuth\Models\User;
use Khiemnt\TakiAuth\Services\TakiAuthService;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    public function __construct(protected TakiAuthService $authService)
    {
    }

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
        ])->validate();

        return $this->authService->registerUser($input);
    }
}
