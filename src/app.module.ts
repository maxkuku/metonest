import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsController } from './news/comments/comments.controller';
import { CommentsModule } from './news/comments/comments.module';
import { CommentsService } from './news/comments/comments.service';
import { NewsModule } from './news/news.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { MailModule } from './mail/mail.module';
import { NewsController } from './news/news.controller';
import { NewsService } from './news/news.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/role/roles.guard';

@Module({
  imports: [
    NewsModule,
    UserModule,
    CommentsModule,
    ServeStaticModule.forRoot({
      //rootPath: join(__dirname, '..', './public'),
      rootPath: join(__dirname, '..', './dist'),
    }),
    MailModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'postgres',
      password: 'pass',
      database: 'news_blog',
      entities: [],
      synchronize: false,
    }),
    AuthModule,
  ],
  controllers: [
    AppController,
    UserController,
    CommentsController,
    NewsController,
  ],
  providers: [
    AppService,
    UserService,
    CommentsService,
    NewsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
