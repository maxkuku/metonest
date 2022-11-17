import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class FindOneParams {
  @IsNumberString()
  id: number;
}
