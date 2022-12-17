import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('news-comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get('all')
  // eslint-disable-next-line @typescript-eslint/ban-types
  getAll(@Query('idNews') idNews): Promise<{}> {
    return this.commentsService.findAll(idNews);
  }
  @Post()
  create(
    @Query('idNews') idNews,
    @Query('userId') userId,
    @Body() comment,
  ): Promise<number> {
    return this.commentsService.create(idNews, comment, userId);
  }
  @Delete(':id')
  remove(@Query('idNews') idNews, @Param('id') idComment): Promise<boolean> {
    return this.commentsService.remove(idNews, idComment);
  }
  @Delete('all')
  removeAll(@Query('idNews') idNews: number | string): Promise<boolean> {
    return this.commentsService.removeAll(idNews);
  }
}
