<?php

namespace Khiemnt\TakiAuth\Actions\Fortify;

use Khiemnt\TakiAuth\Concerns\PasswordValidationRules;
use Khiemnt\TakiAuth\Models\User;
use Khiemnt\TakiAuth\Services\TakiAuthService;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\ResetsUserPasswords;

class ResetUserPassword implements ResetsUserPasswords
{
    use PasswordValidationRules;

    public function __construct(protected TakiAuthService $authService)
    {
    }

    /**
     * Validate and reset the user's forgotten password.
     *
     * @param  array<string, string>  $input
     */
    public function reset(User $user, array $input): void
    {
        Validator::make($input, [
            'password' => $this->passwordRules(),
        ])->validate();

        $this->authService->updatePassword($user, $input['password']);
    }
}
