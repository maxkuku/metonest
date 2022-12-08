import { UsersEntity } from '../../user/user.entity';
export declare class CommentsEntity {
    id: number;
    message: string;
    user: UsersEntity;
    createdAt: Date;
    updatedAt: Date;
}
