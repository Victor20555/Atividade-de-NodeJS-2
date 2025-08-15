import { PostsRepository } from '@/repositories/posts-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'

export class GetUserPostsUseCase {
  constructor(private postsRepository: PostsRepository, private usersRepository: UsersRepository) { }
  async execute({ userId }: { userId: number }) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError();
    }
    return this.postsRepository.findManyByUserId(userId)
  }
}
