import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UsersEntity } from './user.entity';
export declare class UserService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UsersEntity>);
    create(user: UserCreateDto): Promise<UsersEntity>;
    findById(id: any): Promise<UsersEntity>;
    findByEmail(email: any): Promise<UsersEntity>;
    setModerator(idUser: any): Promise<UsersEntity>;
}
