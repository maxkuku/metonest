import { UserService } from './user/user.service';
export declare class AppService {
    private readonly userService;
    constructor(userService: UserService);
    getHello(): string;
}
