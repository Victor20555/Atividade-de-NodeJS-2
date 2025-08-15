import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateUserUseCase } from '@/use-cases/users/update-user-use-case'
import z from 'zod'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  if (!request.userId) {
    return reply.status(400).send({ message: 'Está faltando o ID do usuário.' })
  }
  const updateUserSchema = z.object({
    name: z.string().optional(),
    email: z.email().optional(),
    picture: z.url().optional(),
    password: z.string().min(6).optional()
  })
  const data = updateUserSchema.parse(request.body)
  const usersRepository = new PrismaUsersRepository()
  const updateUserUseCase = new UpdateUserUseCase(usersRepository)

  try {

    const user = await updateUserUseCase.execute({
      id: request.userId,
      name: data.name ?? undefined,
      email: data.email ?? undefined,
      picture: data.picture ?? undefined,
      password: data.password ?? undefined
    })

    return reply.status(200).send(user)
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}

