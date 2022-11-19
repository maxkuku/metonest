import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { CommentsModule } from './comments/comments.module';
import { CommentsService } from './comments/comments.service';
import { MailModule } from '../mail/mail.module';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
@Module({
  controllers: [NewsController],
  providers: [NewsService, CommentsService, UserService],
  imports: [CommentsModule, MailModule, UserModule],
})
export class NewsModule {}
