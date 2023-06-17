import { InputRegistrationUserDto } from './dto/input.registration.user.dto';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async registration(
    registrationUserDto: InputRegistrationUserDto,
  ): Promise<boolean> {
    const { password, email } = registrationUserDto;
    await this.usersRepository.create(email, password);
    return true;
  }
}
