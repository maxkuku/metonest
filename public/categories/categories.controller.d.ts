import { CategoriesService } from './categories.service';
import { CategoriesEntity } from './categories.entity';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(name: any): Promise<CategoriesEntity>;
}
