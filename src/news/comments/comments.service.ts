import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../user/user.entity';
import { NewsEntity } from '../news.entity';
import { CommentsEntity } from './comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async create(
    idNews: number | string,
    message: string,
    userId: number,
  ) {
    const [news, user] = await Promise.all([
      this.newsRepository.findOneBy({ id: Number(idNews) }),
      this.usersRepository.findOneBy({ id: Number(userId) }),
    ]);
    if (!news || !user) throw new NotFoundException('Новость или пользователь не найдены');
    return this.commentsRepository.save({ message, news, user });
  }

  async findAll(
    idNews: number | string,
  ) {
    return this.commentsRepository.find({
      where: { news: { id: Number(idNews) } },
      relations: { user: true },
      order: { createdAt: 'ASC' },
    });
  }

  async remove(idNews: number | string, idComment: string): Promise<boolean> {
    const result = await this.commentsRepository.delete(Number(idComment));
    return Boolean(result.affected);
  }

  async removeAll(idNews: number | string): Promise<boolean> {
    const result = await this.commentsRepository.delete({
      news: { id: Number(idNews) },
    });
    return Boolean(result.affected);
  }
}
