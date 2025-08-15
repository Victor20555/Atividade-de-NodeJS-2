import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/users/authenticate-use-case'
import { InvalidEmailError } from '@/use-cases/errors/invalid-email-error'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credencials-error'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateSchema = z.object({
    email: z.email(),
    password: z.string()
  })

  const { email, password } = authenticateSchema.parse(request.body)

  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)
  try {
    const { token } = await authenticateUseCase.execute({ email, password })
    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidEmailError) {
      return reply.status(400).send({ message: error.message })
    }
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}