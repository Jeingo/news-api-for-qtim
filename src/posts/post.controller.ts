import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Posts } from './post.entity';
import { JwtAuthGuard } from '../utils/guards/jwt.auth.guard';

@Controller('posts')
export class PostController {
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllPosts(): Promise<Posts[]> {}

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getPostById(): Promise<Posts> {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createPost(): Promise<Posts> {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async updatePost(): Promise<boolean> {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deletePost(): Promise<boolean> {}
}
