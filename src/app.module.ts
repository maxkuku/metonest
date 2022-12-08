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
import { UsersEntity } from './user/user.entity';
import { NewsEntity } from './news/news.entity';
import { CategoriesEntity } from './categories/categories.entity';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';

@Module({
  imports: [
    NewsModule,
    UserModule,
    CommentsModule,
    CategoriesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './public'),
      //rootPath: join(__dirname, '..', './dist'),
    }),
    MailModule,
    TypeOrmModule.forFeature([NewsEntity]),
    TypeOrmModule.forFeature([UsersEntity]),
    TypeOrmModule.forFeature([CategoriesEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
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
    CategoriesController,
    NewsController,
  ],
  providers: [
    AppService,
    UserService,
    CommentsService,
    CategoriesService,
    NewsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
