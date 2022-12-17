import { Repository } from 'typeorm';
import { NewsEntity } from './news.entity';
export declare class NewsService {
    private readonly newsRepository;
    constructor(newsRepository: Repository<NewsEntity>);
    create(news: NewsEntity): Promise<NewsEntity>;
    findAll(): Promise<NewsEntity[]>;
    findById(id: number): Promise<NewsEntity[]>;
    remove(id: number): Promise<NewsEntity[]>;
}
