import { CategoriesEntity } from '../categories/categories.entity';
import { UsersEntity } from '../user/user.entity';
export declare class NewsEntity {
    id: number;
    title: string;
    description: string;
    author: string;
    cover: string;
    category: CategoriesEntity;
    user: UsersEntity;
    createdAt: Date;
    updatedAt: Date;
}
