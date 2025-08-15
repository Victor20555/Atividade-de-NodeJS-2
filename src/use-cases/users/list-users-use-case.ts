import { UsersRepository, FindManyWithPostsInterface } from '@/repositories/users-repository'

export class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<FindManyWithPostsInterface[]> {
    return this.usersRepository.findManyWithPosts()
  }
}
