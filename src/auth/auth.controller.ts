import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { InputRegistrationUserDto } from './dto/input.registration.user.dto';
import { Response } from 'express';
import { InputLoginUserDto } from './dto/input.login.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  ) {
    return;
  }
}
