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
import { UserController } from 'src/user/user.controller';
import { UsersEntity } from 'src/user/user.entity';
@Module({
  controllers: [NewsController, CommentsController, UserController],
  providers: [NewsService, CommentsService, UserService],
  imports: [
    TypeOrmModule.forFeature([NewsEntity]),
    TypeOrmModule.forFeature([UsersEntity]),
    forwardRef(() => CommentsModule),
    forwardRef(() => MailModule),
    forwardRef(() => UserModule),
  ],
})
export class NewsModule {}
