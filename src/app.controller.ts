import { Controller, Get, Param, Render, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard) @Get('profile') getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  @Render('home')
  home() {
    return { title: 'Место — истории, которые остаются' };
  }

  @Get('news/:id')
  @Render('article')
  article(@Param('id') id: string) {
    return { title: 'Новость — Место', id };
  }

  @Get('login')
  @Render('auth')
  loginPage() {
    return { title: 'Вход — Место', mode: 'login' };
  }

  @Get('register')
  @Render('auth')
  registerPage() {
    return { title: 'Регистрация — Место', mode: 'register' };
  }

  @Get('editor')
  @Render('editor')
  editor() {
    return { title: 'Новая публикация — Место' };
  }
}
