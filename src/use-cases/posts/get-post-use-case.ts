import { PostsRepository } from '@/repositories/posts-repository'
import { PostNotFoundError } from '../errors/post-not-found-error'

export class GetPostUseCase {
  constructor(private postsRepository: PostsRepository) {}
  async execute({ id }: { id: number }) {
    const post = await this.postsRepository.findById(id)

    if (!post) {
      throw new PostNotFoundError();
    }
    return this.postsRepository.findById(id)
  }
}


