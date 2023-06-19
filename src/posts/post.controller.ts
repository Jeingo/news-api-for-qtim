import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Posts } from './post.entity';
import { JwtAuthGuard } from '../utils/guards/jwt.auth.guard';
import {
  CurrentUser,
  CurrentUserType,
} from '../utils/decorators/current.user.decorator';
import { InputCreatePostDto } from './dto/input.create.post.dto';
import { PostService } from './post.service';
import { InputUpdatePostDto } from './dto/input.update.post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @HttpCode(HttpStatus.OK)
  // @Get()
  // async getAllPosts(): Promise<Posts[]> {}
  //
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getPostById(@Param('id') id: number): Promise<Posts> {
    return this.postService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createPost(
    @Body() createPostDto: InputCreatePostDto,
    @CurrentUser() user: CurrentUserType,
  ): Promise<Posts> {
    return this.postService.create(createPostDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: InputUpdatePostDto,
    @CurrentUser() user: CurrentUserType,
  ): Promise<boolean> {
    return this.postService.updateById(id, updatePostDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deletePost(
    @Param('id') id: number,
    @CurrentUser() user: CurrentUserType,
  ): Promise<boolean> {
    return this.postService.deleteById(id, user);
  }
}
