import { InputRegistrationUserDto } from './dto/input.registration.user.dto';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../users/user.repository';
import bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { InputLoginUserDto } from './dto/input.login.user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async registration(
    registrationUserDto: InputRegistrationUserDto,
  ): Promise<boolean> {
    const { password, email } = registrationUserDto;
    const user = await this.usersRepository.findByEmail(email);

    if (user) throw new ForbiddenException();

    await this.usersRepository.create(email, password);
    return true;
  }

  async validateAndGetUser(loginUserDto: InputLoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    const checkPassword = await bcrypt.compare(password, user.hash);
    if (!checkPassword) throw new UnauthorizedException();

    return user;
  }
}
