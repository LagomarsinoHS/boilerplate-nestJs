import { SetMetadata } from '@nestjs/common';

export const META_ROLES = 'roles';

/**
 * This will add to the METADATA the roles key with the args value
 */

/**
 * @param args Roles that we will check
 */
export const RoleProtected = (...args: string[]) => {
  return SetMetadata(META_ROLES, args);
};
