import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from '../posts/post.entity';
import { Session } from '../sessions/session.entity';

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

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}
