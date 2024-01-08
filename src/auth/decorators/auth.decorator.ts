/* eslint-disable prettier/prettier */
import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidRoles } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';

/**
 * This is a decorator composition, it will
 * 1. Add roles Metadata
 * 2. allow the token to be used
 * 3. check if the user passed in the token have the role to access
 */

/**
 * @param roles Roles that are allowed to pass
 */
export function Auth(...roles: ValidRoles[]) {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard)
    );
}
