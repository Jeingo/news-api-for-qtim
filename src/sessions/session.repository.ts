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

    const issueAt = result.iat * 1000;
    const expireAt = result.exp * 1000;
    const userId = result.userId;

    const session = await this.sessionsRepository.create({
      expireAt: expireAt,
      issueAt: issueAt,
      userId: userId,
    });

    return session;
  }
}
