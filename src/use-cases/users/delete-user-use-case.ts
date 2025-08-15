import { UsersRepository } from '@/repositories/users-repository'

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ id }: { id: number }) {
    await this.usersRepository.delete(id)
  }
}
