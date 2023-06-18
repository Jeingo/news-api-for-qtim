import { Injectable } from '@nestjs/common';
import { SessionRepository } from './session.repository';
import { Token } from '../adapters/jwt.types';
import { Session } from './session.entity';
@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async create(refreshToken: Token): Promise<Session> {
    return this.sessionRepository.create(refreshToken);
  }

  async update(refreshToken: Token): Promise<Session> {
    return this.sessionRepository.update(refreshToken);
  }

  async remove(userId: number): Promise<boolean> {
    return this.sessionRepository.remove(userId);
  }
}
