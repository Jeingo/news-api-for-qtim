import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class InputCreatePostDto {
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @MaxLength(1000)
  @IsString()
  @IsNotEmpty()
  content: string;
}
