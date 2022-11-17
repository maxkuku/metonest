import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  // Возвращаемое значение может быть Promise<UsersEntity|undefined>

  async findById(id: number): Promise<UsersEntity[]> {
    return await this.usersRepository.find({ where: { id: id } });
  }

  async create(user) {
    const userEntity = new UsersEntity();
    userEntity.firstName = user.firstName;
    userEntity.lastName = user.lastName;
    userEntity.email = user.email;
    userEntity.role = user.role;
    return await this.usersRepository.save(userEntity);
  }
}
