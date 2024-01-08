<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

    This is a boilerplate of a server with the basic auth that we will need

1. Have decorator to get the user from the token
2. Have a decorator to add the roles (role-protected.decorator)
3. Have a composition decorator if you want to use it. It have the others decorators inside (auth.decorator)
4. Have guards to allow or forbid the access to the user depending of the roles(user-role.guards)
5. Have jwt integrated with password and strategy (jwt.strategy)