import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesEntity } from './categories.entity';
@Injectable()
export class CategoriesService implements OnModuleInit {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {}
  async onModuleInit() {
    if ((await this.categoriesRepository.count()) === 0) {
      await this.categoriesRepository.save(
        ['Культура', 'Город', 'Люди', 'Идеи'].map((name) => ({ name })),
      );
    }
  }
  async create(name: string) {
    return await this.categoriesRepository.save({ name });
  }
  findAll(): Promise<CategoriesEntity[]> {
    return this.categoriesRepository.find({ order: { name: 'ASC' } });
  }
  async findById(id: number): Promise<CategoriesEntity> {
    return await this.categoriesRepository.findOne({ where: { id: id } });
  }
}
