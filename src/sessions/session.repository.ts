import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './session.entity';
import { Token } from '../adapters/jwt.types';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '../configuration';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
    private readonly configService: ConfigService<ConfigType>,
    private readonly jwtService: JwtService,
  ) {}

  async create(refreshToken: Token): Promise<Session> {
    const result = this.jwtService.verify(refreshToken, {
      secret: this.configService.get('jwt_refresh_secret'),
    });

    const issueAt = new Date(result.iat * 1000);
    const expireAt = new Date(result.exp * 1000);
    const userId = result.userId;

    const session = await this.sessionsRepository.create({
      expireAt: expireAt,
      issueAt: issueAt,
      userId: userId,
    });

    await this.sessionsRepository.save(session);

    return session;
  }

  async update(refreshToken: Token): Promise<Session> {
    const result = this.jwtService.verify(refreshToken, {
      secret: this.configService.get('jwt_refresh_secret'),
    });

    const issueAt = new Date(result.iat * 1000);
    const expireAt = new Date(result.exp * 1000);
    const userId = result.userId;

    const session = await this.sessionsRepository.findOneBy({ userId: userId });
    session.issueAt = issueAt;
    session.expireAt = expireAt;
    await this.sessionsRepository.save(session);

    return session;
  }

  async remove(userId: number): Promise<boolean> {
    await this.sessionsRepository.delete({ userId: userId });
    return true;
  }

  async isActive(issueAt: Date): Promise<boolean> {
    const result = await this.sessionsRepository.findOneBy({
      issueAt: issueAt,
    });
    return !!result;
  }
}
