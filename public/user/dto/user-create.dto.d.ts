import { Role } from 'src/auth/role/role.enum';
export declare class UserCreateDto {
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    password: any;
}
