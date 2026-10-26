import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UsersEntity } from '../../user/user.entity';
import { NewsEntity } from '../news.entity';
@Entity('comments')
export class CommentsEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column('text') message: string;
  @ManyToOne(() => UsersEntity, (user) => user.comments) user: UsersEntity;
  @ManyToOne(() => NewsEntity, { onDelete: 'CASCADE' }) news: NewsEntity;
  @CreateDateColumn({ type: 'datetime' }) createdAt: Date;
  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
