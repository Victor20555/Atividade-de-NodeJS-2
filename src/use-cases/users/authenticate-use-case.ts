import * as jwt from 'jsonwebtoken'
import { UsersRepository } from '@/repositories/users-repository'
import { compare } from 'bcryptjs'
import { env } from '@/env'
import { InvalidEmailError } from '../errors/invalid-email-error'
import { InvalidCredentialsError } from '../errors/invalid-credencials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateUseCaseRequest) {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new InvalidEmailError();
    }
    const passwordMatch = await compare(password, user.passwordHash)
    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }
    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: '7d',
    })
    return { token }
  }
}
