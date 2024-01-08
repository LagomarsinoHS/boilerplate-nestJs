import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

/**
 * This decorator its a PARAM decorator, it will get the user properties passed in the "data" param, if there is not, it will give the whole object
 */

/**
 * @param data user properties that we will find, if none passed, we will give all
 */
export const GetUser = createParamDecorator(
  (data: string[], ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new InternalServerErrorException('User not found in Request.');
    }
    if (data.length === 0) {
      return user;
    }

    // Le indico que en caso de que no me pasen parámetros por retornar, me devuelva todo el usuario, caso contrario, solo aquellas propiedades
    const filteredUser: Record<string, any> = {};

    data.forEach((prop) => {
      filteredUser[prop] = user[prop] ?? null;
    });

    return filteredUser;
  },
);
