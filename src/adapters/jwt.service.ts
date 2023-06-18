import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '../configuration';
import {
  AccessTokenPayloadType,
  RefreshTokenPayloadType,
  Token,
  Tokens,
} from './jwt.types';

@Injectable()
export class JwtAdapter {
  constructor(
    private readonly configService: ConfigService<ConfigType>,
    private readonly jwtService: JwtService,
  ) {}
  getTokens(userId: number): Tokens {
    const accessToken = this.createJWT(userId);
    const refreshToken = this.createRefreshJWT(userId);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
  checkExpirationRefreshToken(token: Token): boolean {
    try {
      this.jwtService.verify(token, {
        secret: this.configService.get('jwt_refresh_secret'),
      });
      return true;
    } catch {
      return false;
    }
  }
  checkExpirationAccessToken(token: Token): boolean {
    try {
      this.jwtService.verify(token, {
        secret: this.configService.get('jwt_access_secret'),
      });
      return true;
    } catch {
      return false;
    }
  }
  getRefreshTokenPayload(refreshToken: Token): RefreshTokenPayloadType | null {
    try {
      return this.jwtService.decode(refreshToken) as RefreshTokenPayloadType;
    } catch {
      return null;
    }
  }
  getAccessTokenPayload(accessToken: Token): AccessTokenPayloadType | null {
    try {
      return this.jwtService.decode(accessToken) as AccessTokenPayloadType;
    } catch {
      return null;
    }
  }
  private createJWT(userId: number): Token {
    return this.jwtService.sign(
      { userId: userId },
      {
        secret: this.configService.get('jwt_access_secret'),
        expiresIn: this.configService.get('jwt_access_expire'),
      },
    );
  }
  private createRefreshJWT(userId: number): Token {
    return this.jwtService.sign(
      { userId: userId },
      {
        secret: this.configService.get('jwt_refresh_secret'),
        expiresIn: this.configService.get('jwt_refresh_expire'),
      },
    );
  }
}
