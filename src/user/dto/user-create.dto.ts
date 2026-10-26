import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { Role } from '../../auth/role/role.enum';
export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty() @IsString() lastName: string;
  @IsNotEmpty() @IsEmail() email: string;
  role: Role = Role.User;
  @IsNotEmpty() @IsString() password: string;
}
