import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { InputRegistrationUserDto } from './dto/input.registration.user.dto';
import { Response } from 'express';
import { InputLoginUserDto } from './dto/input.login.user.dto';
import { OutputAccessTokenDto } from './dto/output.access.token.dto';
import { JwtAdapter } from '../adapters/jwt.service';
import { SessionService } from '../sessions/session.service';
import { CookieGuard } from '../utils/guards/cookie.guard';
import { RefreshTokenPayloadType } from '../adapters/jwt.types';
import { PayloadFromRefreshToken } from '../utils/decorators/payload.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtAdapter: JwtAdapter,
    private readonly sessionService: SessionService,
  ) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('registration')
  async registration(@Body() registrationUserDto: InputRegistrationUserDto) {
    await this.authService.registration(registrationUserDto);
    return;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginUserDto: InputLoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<OutputAccessTokenDto> {
    const user = await this.authService.validateAndGetUser(loginUserDto);

    const { accessToken, refreshToken } = await this.jwtAdapter.getTokens(
      user.id,
    );

    await this.sessionService.create(refreshToken);

    await response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
    return { accessToken: accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(CookieGuard)
  @Post('refresh-token')
  async refreshToken(
    @PayloadFromRefreshToken() payload: RefreshTokenPayloadType,
    @Res({ passthrough: true }) response: Response,
  ): Promise<OutputAccessTokenDto> {
    const { accessToken, refreshToken } = await this.jwtAdapter.getTokens(
      payload.userId,
    );

    await this.sessionService.update(refreshToken);

    await response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
    return { accessToken: accessToken };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(CookieGuard)
  @Post('logout')
  async logout(
    @PayloadFromRefreshToken() payload: RefreshTokenPayloadType,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.sessionService.remove(payload.userId);

    response.clearCookie('refreshToken');
    return;
  }
}
