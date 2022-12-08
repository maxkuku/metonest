import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
export declare class RolesGuard implements CanActivate {
    private readonly reflector;
    private readonly usersService;
    private readonly authService;
    constructor(reflector: Reflector, usersService: UserService, authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
