import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { NewsEntity } from '../news/news.entity';
import { CommentsEntity } from '../news/comments/comments.entity';
import { IsEnum } from 'class-validator';
import { Role } from '../auth/role/role.enum';
@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column('text') firstName: string;
  @Column('text') lastName: string;
  @Column('text', { unique: true }) email: string;
  @Column('text', { select: false }) password: string;

  @Column('text', { default: Role.User })
  @IsEnum(Role)
  role: Role;
  @OneToMany(() => NewsEntity, (news) => news.user) news: NewsEntity[];
  @OneToMany(() => CommentsEntity, (comments) => comments.user)
  comments: CommentsEntity[];
  @CreateDateColumn({ type: 'datetime' }) createdAt: Date;
  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
