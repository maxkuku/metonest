import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any | null>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    verify(token: string): Promise<any>;
}
