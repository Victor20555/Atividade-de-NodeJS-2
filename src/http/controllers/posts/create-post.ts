import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreatePostUseCase } from '@/use-cases/posts/create-post-use-case'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
  
  const createPostBodySchema = z.object({ 
    title: z.string(),
    content: z.string(),
  })

  if (!request.userId) {
    return reply.status(401).send({ message: 'Usuário não autenticado' })
  }

  const { title, content,  } = createPostBodySchema.parse(request.body)

  const postsRepository = new PrismaPostsRepository()
  const usersRepository = new PrismaUsersRepository()
  const createPostUseCase = new CreatePostUseCase(postsRepository, usersRepository)

  try {
    const post = await createPostUseCase.execute({ title, content, userId: request.userId })
    return reply.status(201).send(post)
  } catch (error) { 
    if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
