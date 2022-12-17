/// <reference types="multer" />
import { CommentsService } from './comments/comments.service';
import { NewsService } from './news.service';
import { NewsIdDto } from './dtos/news-id.dto';
import { NewsCreateDto } from './dtos/news-create.dto';
import { MailService } from '../mail/mail.service';
import { NewsEntity } from './news.entity';
import { UserService } from 'src/user/user.service';
import { CategoriesService } from 'src/categories/categories.service';
export declare class NewsController {
    private newsService;
    private userService;
    private categoriesService;
    private readonly commentService;
    private mailService;
    constructor(newsService: NewsService, userService: UserService, categoriesService: CategoriesService, commentService: CommentsService, mailService: MailService);
    getNews(): Promise<NewsEntity[]>;
    findById(params: NewsIdDto): Promise<NewsEntity[] | undefined>;
    remove(params: NewsIdDto): Promise<boolean>;
    uploadFile(file: Express.Multer.File): void;
    create(news: NewsCreateDto, cover: Express.Multer.File): Promise<NewsEntity>;
}
