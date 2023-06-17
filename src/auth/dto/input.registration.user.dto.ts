import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class InputRegistrationUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Length(6, 20)
  @IsString()
  @IsNotEmpty()
  password: string;
}
