import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('Posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  title: string;

  @Column('varchar', { length: 500 })
  shortDescription: string;

  @Column('text')
  content: string;

  @Column('timestamptz')
  createdAt: Date;

  @Column('integer')
  userId: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
