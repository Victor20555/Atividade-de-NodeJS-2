import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository'
import { GetUserPostsUseCase } from '@/use-cases/posts/get-user-posts-use-case'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import z from 'zod'

export async function getUserPosts(request: FastifyRequest, reply: FastifyReply) {
  const getUserPostsParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
  })
  const { id } = getUserPostsParamsSchema.parse(request.params) 
  const postsRepository = new PrismaPostsRepository()
  const usersRepository = new PrismaUsersRepository()
  const getUserPostsUseCase = new GetUserPostsUseCase(postsRepository, usersRepository)

  try {
    const posts = await getUserPostsUseCase.execute({ userId: Number(id) })
    return reply.status(200).send(posts)
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}

