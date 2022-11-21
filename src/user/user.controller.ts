import { Controller, Get } from '@nestjs/common';
import { UserEntity } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @Get(':id')
  // async getUser(id): Promise<any> {
  //   return this.userService.findById({ where: { user: User } });
  // }
}
