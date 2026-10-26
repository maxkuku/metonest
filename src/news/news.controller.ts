import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { newsTemplate } from '../views/newstemplate';
import { htmlTemplate } from '../views/template';
import { CommentsService } from './comments/comments.service';
import { News } from './news.interface';
import { NewsService } from './news.service';
import { NewsIdDto } from './dtos/news-id.dto';
import { NewsCreateDto } from './dtos/news-create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { HelperFileLoader } from '../utils/HelperFileLoader';
import { diskStorage } from 'multer';
import { LoggingInterceptor } from '../common/middleware/logger.interceptor';
import { MailService } from '../mail/mail.service';
import { NewsEntity } from './news.entity';
import { UserService } from '../user/user.service';
import { CategoriesService } from '../categories/categories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const PATH_NEWS = '/news-static/';
const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = PATH_NEWS;

const imageFileFilter = (req, file, callback) => {
  const fileExtension = file.originalname.split('.').reverse()[0];
  if (!fileExtension || !fileExtension.match(/(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Ожидается изображение'), false);
  }
  callback(null, true);
};

@Controller('api/news')
@UseInterceptors(LoggingInterceptor)
export class NewsController {
  constructor(
    private newsService: NewsService,
    private userService: UserService,
    private categoriesService: CategoriesService,
    private readonly commentService: CommentsService,
    private mailService: MailService,
  ) {}

  @Get('all')
  async getNews(): Promise<NewsEntity[]> {
    return this.newsService.findAll();
  }

  @Get(':id')
  async findById(
    @Param() params: NewsIdDto,
  ): Promise<NewsEntity | undefined> {
    return this.newsService.findById(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param() params: NewsIdDto): Promise<boolean> {
    await this.newsService.remove(params.id);
    await this.commentService.removeAll(params.id);
    return true;
  }

  // @Get()
  // async findAll(): Promise<string> {
  //   const news = this.newsService.findAll();
  //   return htmlTemplate(newsTemplate({ news }));
  // }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: helperFileLoader.destinationPath,
        filename: helperFileLoader.customFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: helperFileLoader.destinationPath,
        filename: helperFileLoader.customFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() news: NewsCreateDto,
    @UploadedFile() cover: Express.Multer.File,
    @Req() request,
  ) {
    // Поиск пользователя по его ID
    const _user = await this.userService.findById(request.user.id);
    if (!_user) {
      throw new HttpException(
        'Не существует такого автора',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Поиск категории по её ID
    const _category = await this.categoriesService.findById(news.categoryId);
    if (!_category) {
      throw new HttpException(
        'Не существует такой категории',
        HttpStatus.BAD_REQUEST,
      );
    }

    const _newsEntity = new NewsEntity();
    if (cover?.filename) {
      _newsEntity.cover = PATH_NEWS + cover.filename;
    }
    _newsEntity.title = news.title;
    _newsEntity.description = news.description;
    _newsEntity.user = _user;
    _newsEntity.author = `${_user.firstName} ${_user.lastName}`;
    _newsEntity.category = _category;

    const _news = await this.newsService.create(_newsEntity);
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) await this.mailService.sendNewNewsForAdmins([adminEmail], _news);
    return _news;
  }
}
