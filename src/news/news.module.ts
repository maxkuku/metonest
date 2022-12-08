import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsEntity } from './news.entity';
import { CommentsModule } from './comments/comments.module';
import { CommentsService } from './comments/comments.service';
import { CommentsController } from './comments/comments.controller';
import { MailModule } from '../mail/mail.module';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { UserController } from '../user/user.controller';
import { UsersEntity } from '../user/user.entity';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesModule } from '../categories/categories.module';
import { CategoriesEntity } from 'src/categories/categories.entity';
@Module({
  controllers: [NewsController, CommentsController, UserController],
  providers: [NewsService, CommentsService, CategoriesService, UserService],
  imports: [
    TypeOrmModule.forFeature([NewsEntity]),
    TypeOrmModule.forFeature([UsersEntity]),
    TypeOrmModule.forFeature([CategoriesEntity]),
    forwardRef(() => CommentsModule),
    forwardRef(() => CategoriesModule),
    forwardRef(() => MailModule),
    forwardRef(() => UserModule),
  ],
})
export class NewsModule {}
