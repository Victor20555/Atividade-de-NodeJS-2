import { PostsRepository, FindManyWithUserInterface } from '@/repositories/posts-repository'

export class ListPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}
  async execute(): Promise<FindManyWithUserInterface[]> {
    return this.postsRepository.findManyWithUser()
  }
}
