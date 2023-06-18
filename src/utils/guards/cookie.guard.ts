import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAdapter } from '../../adapters/jwt.service';
import { SessionRepository } from '../../sessions/session.repository';
import { RefreshTokenPayloadType, Token } from '../../adapters/jwt.types';

@Injectable()
export class CookieGuard implements CanActivate {
  constructor(
    private readonly jwtAdapter: JwtAdapter,
    private readonly sessionsRepository: SessionRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies?.refreshToken;
    const payload = await this.checkAuthorizationAndGetPayload(refreshToken);
    if (!payload) {
      throw new UnauthorizedException();
    }
    request.payload = payload;
    return true;
  }
  private async checkAuthorizationAndGetPayload(
    refreshToken: Token,
  ): Promise<RefreshTokenPayloadType | false> {
    const result = this.jwtAdapter.checkExpirationRefreshToken(refreshToken);
    if (!result) return false;
    const payload = this.jwtAdapter.getRefreshTokenPayload(refreshToken);
    const statusSession = await this.isActiveSession(payload.iat);
    if (!statusSession) return false;
    return payload;
  }
  private async isActiveSession(iat: number): Promise<boolean> {
    const issueAt = new Date(iat * 1000);
    return await this.sessionsRepository.isActive(issueAt);
  }
}
