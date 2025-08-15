import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ListUsersUseCase } from '@/use-cases/users/list-users-use-case'

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  const usersRepository = new PrismaUsersRepository()
  const listUsersUseCase = new ListUsersUseCase(usersRepository)
  const users = await listUsersUseCase.execute()
  return reply.status(200).send(users)
}
