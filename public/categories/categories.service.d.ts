import { Repository } from 'typeorm';
import { CategoriesEntity } from './categories.entity';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: Repository<CategoriesEntity>);
    create(name: string): Promise<{
        name: string;
    } & CategoriesEntity>;
    findById(id: number): Promise<CategoriesEntity>;
}
