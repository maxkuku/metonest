import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  async create(news: NewsEntity) {
    return await this.newsRepository.save(news);
  }

  async findAll(): Promise<NewsEntity[]> {
    return await this.newsRepository.find({
      relations: { user: true, category: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: number): Promise<NewsEntity> {
    return await this.newsRepository.findOne({
      where: { id },
      relations: { user: true, category: true },
    });
  }

  async remove(id: number) {
    const _news = await this.findById(id);
    if (_news) return await this.newsRepository.remove(_news);
  }
}
