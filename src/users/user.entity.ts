import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  email: string;

  @Column('varchar', { length: 100 })
  hash: string;

  @Column('timestamptz')
  createdAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
