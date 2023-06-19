import { Injectable } from '@nestjs/common';
import { InputCreatePostDto } from './dto/input.create.post.dto';
import { CurrentUserType } from '../utils/decorators/current.user.decorator';
import { Posts } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InputUpdatePostDto } from './dto/input.update.post.dto';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}
  async create(
    createPostDto: InputCreatePostDto,
    user: CurrentUserType,
  ): Promise<Posts> {
    const { title, shortDescription, content } = createPostDto;

    const dateNow = new Date();

    const post = await this.postsRepository.create({
      title: title,
      shortDescription: shortDescription,
      content: content,
      createdAt: dateNow,
      updatedAt: dateNow,
      userId: user.userId,
    });

    await this.postsRepository.save(post);

    return post;
  }

  async getById(postId: number): Promise<Posts> {
    const post = await this.postsRepository.findOneBy({ id: postId });
    return post;
  }

  async updateById(
    postId: number,
    updatePostDto: InputUpdatePostDto,
  ): Promise<boolean> {
    const { title, shortDescription, content } = updatePostDto;

    await this.postsRepository.update(
      { id: postId },
      {
        title: title,
        shortDescription: shortDescription,
        content: content,
        updatedAt: new Date(),
      },
    );
    return true;
  }

  async deleteById(postId: number): Promise<boolean> {
    await this.postsRepository.delete({ id: postId });
    return true;
  }
}
