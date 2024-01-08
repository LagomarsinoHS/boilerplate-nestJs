import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/auth/entities/user.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { ValidRoles } from '../interfaces';

/**
 * It will get the user object from the request and check if it has the allowed roles to check the information
 */
@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const { roles, fullName } = req.user as UserEntity;
    //const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());
    const validRoles: ValidRoles[] = this.getValidRoles(context);

    if (!validRoles || validRoles.length === 0) {
      console.log(
        'No valid roles were specified for this route. Allowing access.',
      );
      return true;
    }

    if (this.userHasValidRole(roles, validRoles)) {
      console.log('The user has a valid role. You can continue.');
      return true;
    }

    throw new ForbiddenException(
      `User: ${fullName} doesn't have permission access.`,
    );
  }

  private getValidRoles(context: ExecutionContext): ValidRoles[] {
    return (
      this.reflector.getAllAndOverride(META_ROLES, [
        context.getHandler(),
        context.getClass(),
      ]) || []
    );
  }

  private userHasValidRole(
    userRoles: ValidRoles[],
    validRoles: ValidRoles[],
  ): boolean {
    const hasValidRole = userRoles.some((role) => validRoles.includes(role));
    console.log({ userRoles, validRoles });

    return hasValidRole;
  }
}
