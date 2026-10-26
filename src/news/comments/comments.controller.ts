import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('api/news/:idNews/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get()
  // eslint-disable-next-line @typescript-eslint/ban-types
  getAll(@Param('idNews') idNews): Promise<{}> {
    return this.commentsService.findAll(idNews);
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Param('idNews') idNews,
    @Req() request,
    @Body('message') message: string,
  ) {
    return this.commentsService.create(idNews, message, request.user.id);
  }
  @Delete(':id')
  remove(@Query('idNews') idNews, @Param('id') idComment): Promise<boolean> {
    return this.commentsService.remove(idNews, idComment);
  }
  @Delete('all')
  removeAll(@Param('idNews') idNews: number | string): Promise<boolean> {
    return this.commentsService.removeAll(idNews);
  }
}
