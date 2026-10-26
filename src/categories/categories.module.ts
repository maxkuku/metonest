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
import { CategoriesController } from './categories.controller';
@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [TypeOrmModule.forFeature([CategoriesEntity])],
  exports: [CategoriesService],
})
export class CategoriesModule {}
