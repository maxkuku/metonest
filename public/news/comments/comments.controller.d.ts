import { CommentsService } from './comments.service';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    getAll(idNews: any): Promise<{}>;
    create(idNews: any, userId: any, comment: any): Promise<number>;
    remove(idNews: any, idComment: any): Promise<boolean>;
    removeAll(idNews: number | string): Promise<boolean>;
}
