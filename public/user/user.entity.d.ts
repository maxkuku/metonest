import { NewsEntity } from '../news/news.entity';
import { CommentsEntity } from '../news/comments/comments.entity';
import { Role } from 'src/auth/role/role.enum';
export declare class UsersEntity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    news: NewsEntity[];
    comments: CommentsEntity[];
    createdAt: Date;
    updatedAt: Date;
}
