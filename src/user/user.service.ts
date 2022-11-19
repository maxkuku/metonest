import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from '../utils/crypto';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UsersEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  // Возвращаемое значение может быть Promise<UsersEntity|undefined>

  async create(user: UserCreateDto) {
    const userEntity = new UsersEntity();
    userEntity.firstName = user.firstName;
    userEntity.lastName = user.lastName;
    userEntity.email = user.email;
    userEntity.role = user.role;
    userEntity.password = await hash(user.password);
    return await this.usersRepository.save(userEntity);
  }

  async findById(id): Promise<UsersEntity> {
    return await this.usersRepository.findOne({ id });
  }

  async findByEmail(email): Promise<UsersEntity> {
    return this.usersRepository.findOne({ email });
  }
  async setModerator(idUser): Promise<UsersEntity> {
    const _user = await this.findById(idUser);
    if (!_user) {
      throw new UnauthorizedException();
    }
    _user.roles = Role.Moderator;
    return this.usersRepository.save(_user);
  }
}
