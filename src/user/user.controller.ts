import { Controller, Get } from '@nestjs/common';
import { UserEntity } from './user.interface';
import { UserService } from './user.service';

const user: UserEntity = {
  id: 101,
  firstName: 'Alan',
  lastName: 'Turing',
  email: 'alan@email.com',
  roles: ['admin'],
};

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @Get()
  // async getUser(): Promise<UserEntity> {
  //   return this.userService.findOne(user);
  // }

  // @Get('/first')
  // async getUserFirst(): Promise<string> {
  //   return this.userService.findOneFirst(user.firstName);
  // }
}
