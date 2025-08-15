import { PostsRepository } from '@/repositories/posts-repository'

export class DeletePostUseCase {
  constructor(private postsRepository: PostsRepository) {}
  async execute({ id }: { id: number }) {
    await this.postsRepository.delete(id)
  }
}

