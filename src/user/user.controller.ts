import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserService } from './user.service';

@Controller('api/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: UserCreateDto) {
    if (await this.userService.findByEmail(dto.email)) {
      throw new ConflictException('Пользователь с такой почтой уже существует');
    }
    const user = await this.userService.create(dto);
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
