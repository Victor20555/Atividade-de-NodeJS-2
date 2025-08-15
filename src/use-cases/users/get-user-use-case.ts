import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) { }
  async execute({ id }: { id: number }) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError();
    }
    return this.usersRepository.findById(id)
  }
}
