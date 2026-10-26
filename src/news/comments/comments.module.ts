import { forwardRef, Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { SocketCommentsGateway } from './socket-comments.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from './comments.entity';
import { NewsModule } from '../news.module';
import { UserModule } from '../../user/user.module';
import { NewsEntity } from '../news.entity';
import { UsersEntity } from '../../user/user.entity';
@Module({
  controllers: [CommentsController],
  providers: [CommentsService, SocketCommentsGateway],
  exports: [CommentsService],
  imports: [
    TypeOrmModule.forFeature([CommentsEntity, NewsEntity, UsersEntity]),
  ],
})
export class CommentsModule {}
