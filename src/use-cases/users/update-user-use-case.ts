import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserNotFoundError } from '../errors/user-not-found-error'

interface UpdateUserUseCaseRequest {
  id: number
  name: string | undefined
  email: string | undefined
  picture: string | undefined
  password: string | undefined
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ id, name, email, picture, password }: UpdateUserUseCaseRequest) {
    const user = await this.usersRepository.findById(id)
    if (!user) {
      throw new UserNotFoundError()
    }
    const data: any = {}
    if (name) data.name = name
    if (email) data.email = email
    if (picture) data.picture = picture
    if (password) data.passwordHash = await hash(password, 6)
    return await this.usersRepository.update(id, data)
  }
}


