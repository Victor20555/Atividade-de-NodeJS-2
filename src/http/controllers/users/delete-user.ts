import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteUserUseCase } from '@/use-cases/users/delete-user-use-case'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  if (!request.userId) {
    return reply.status(400).send({ message: 'Está faltando o ID do usuário.' })
  }
  
  const usersRepository = new PrismaUsersRepository()
  const deleteUserUseCase = new DeleteUserUseCase(usersRepository)
  
  await deleteUserUseCase.execute({ id: request.userId })
  
  return reply.status(204).send()
}