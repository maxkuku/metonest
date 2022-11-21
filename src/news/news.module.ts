import { forwardRef, Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { CommentsModule } from './comments/comments.module';
import { CommentsService } from './comments/comments.service';
import { MailModule } from '../mail/mail.module';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { CommentsController } from './comments/comments.controller';
@Module({
  controllers: [NewsController, CommentsController],
  providers: [NewsService, CommentsService, UserService],
  imports: [CommentsModule, MailModule, forwardRef(() => UserModule)],
})
export class NewsModule {}
