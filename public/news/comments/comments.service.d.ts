export declare class CommentsService {
    private readonly comments;
    create(idNews: number | string, comment: string, userId: number): Promise<number>;
    findAll(idNews: number | string): Promise<{
        comment: any;
        id: any;
    } | undefined>;
    remove(idNews: number | string, idComment: string): Promise<boolean>;
    removeAll(idNews: number | string): Promise<boolean>;
}
