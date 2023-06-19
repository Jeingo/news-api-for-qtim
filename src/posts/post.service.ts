import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InputCreatePostDto } from './dto/input.create.post.dto';
import { CurrentUserType } from '../utils/decorators/current.user.decorator';
import { Posts } from './post.entity';
import { PostRepository } from './post.repository';
import { InputUpdatePostDto } from './dto/input.update.post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}
  async create(
    createPostDto: InputCreatePostDto,
    user: CurrentUserType,
  ): Promise<Posts> {
    return this.postRepository.create(createPostDto, user);
  }

  async getById(postId: number): Promise<Posts> {
    const post = await this.postRepository.getById(postId);

    if (!post) throw new NotFoundException();

    return post;
  }

  async updateById(
    postId: number,
    updatePostDto: InputUpdatePostDto,
    user: CurrentUserType,
  ): Promise<boolean> {
    const post = await this.postRepository.getById(postId);

    if (!post) throw new NotFoundException();
    if (post.userId !== user.userId) throw new ForbiddenException();

    return this.postRepository.updateById(postId, updatePostDto);
  }

  async deleteById(postId: number, user: CurrentUserType): Promise<boolean> {
    const post = await this.postRepository.getById(postId);

    if (!post) throw new NotFoundException();
    if (post.userId !== user.userId) throw new ForbiddenException();

    return this.postRepository.deleteById(postId);
  }
}
