import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto';
import { Auth, GetUser, RoleProtected } from './decorators';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: UserEntity) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private2')
  // @SetMetadata('roles', ['admin', 'super-user']) -> Esto lo reemplazaré por un nuevo Decorador que se encargará de agregar la metadata y los roles
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: UserEntity) {
    return {
      ok: true,
      user,
    };
  }

  // Esta ruta hara lo mismo que la anterior pero usaremos un decorator compositon para que solo en 1 decorator hagamos todo lo anterior
  @Get('private3')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  privateRoute3(@GetUser() user: UserEntity) {
    return {
      ok: true,
      user,
    };
  }
}
