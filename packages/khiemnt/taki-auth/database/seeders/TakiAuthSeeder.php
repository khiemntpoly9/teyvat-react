<?php

namespace Khiemnt\\TakiAuth\\Database\\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Khiemnt\TakiAuth\Models\TakiUser;

class TakiAuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'view dashboard']);
        Permission::create(['name' => 'manage users']);
        Permission::create(['name' => 'manage roles']);

        // create roles and assign existing permissions
        $role1 = Role::create(['name' => 'user']);
        $role1->givePermissionTo('view dashboard');

        $role2 = Role::create(['name' => 'admin']);
        $role2->givePermissionTo(Permission::all());

        $role3 = Role::create(['name' => 'super-admin']);
        // gets all permissions via Gate::before rule (usually)

        // Create sample super-admin
        $user = TakiUser::create([
            'name' => 'Super Admin',
            'email' => 'admin@taki.com',
            'password' => bcrypt('password'),
        ]);
        $user->assignRole($role3);
    }
}
