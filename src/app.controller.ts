import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto, FindOneParams } from './user/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello(): { message: string } {
    return { message: 'Hello world!' };
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): string {
    return 'This action returns a user';
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): string {
    return 'This action adds a new user';
  }
}
