import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserUseCase } from '@/use-cases/users/get-user-use-case'
import z from 'zod'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  const getUserParams = z.object({
    id: z.coerce.number().int().positive(),
  })
    
  const { id } = getUserParams.parse(request.params) 
  const usersRepository = new PrismaUsersRepository()
  const getUserUseCase = new GetUserUseCase(usersRepository)
  
  try {
  const user = await getUserUseCase.execute({ id })
  return reply.status(200).send(user)
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ message: error.message })
    } 
    throw error
  }
}
