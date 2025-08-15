import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository'
import { GetPostUseCase } from '@/use-cases/posts/get-post-use-case'
import z from 'zod'
import { ca } from 'zod/v4/locales/index.cjs'
import { PostNotFoundError } from '@/use-cases/errors/post-not-found-error'

export async function getPost(request: FastifyRequest, reply: FastifyReply) {
  const getPostParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
  })

  const { id } = getPostParamsSchema.parse(request.params)
  const postsRepository = new PrismaPostsRepository()
  const getPostUseCase = new GetPostUseCase(postsRepository)
  try {
    const post = await getPostUseCase.execute({ id })
    return reply.status(200).send(post)
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
