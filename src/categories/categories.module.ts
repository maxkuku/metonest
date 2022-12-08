import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsController } from '../news/news.controller';
import { NewsService } from '../news/news.service';
import { NewsEntity } from '../news/news.entity';
import { CommentsModule } from '../news/comments/comments.module';
import { CommentsService } from '../news/comments/comments.service';
import { CommentsController } from '../news/comments/comments.controller';
import { MailModule } from '../mail/mail.module';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { UserController } from '../user/user.controller';
import { UsersEntity } from '../user/user.entity';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesEntity } from './categories.entity';
@Module({
  controllers: [NewsController, CommentsController, UserController],
  providers: [NewsService, CommentsService, CategoriesService, UserService],
  imports: [
    TypeOrmModule.forFeature([NewsEntity]),
    TypeOrmModule.forFeature([CategoriesEntity]),
    TypeOrmModule.forFeature([UsersEntity]),
    forwardRef(() => CommentsModule),
    forwardRef(() => MailModule),
    forwardRef(() => UserModule),
  ],
})
export class CategoriesModule {}
