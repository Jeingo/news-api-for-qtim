import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('Session')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamptz')
  issueAt: Date;

  @Column('timestamptz')
  expireAt: Date;

  @Column('integer')
  userId: number;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;
}
