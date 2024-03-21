import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Vous n\'êtes pas authentifié.');
    }

    const roles = this.reflector.get<Role[]>('roles', context.getHandler()) || [];
    const hasRole = () => roles.some((role) => user.role.includes(role));
    return user && hasRole();
  }
}
