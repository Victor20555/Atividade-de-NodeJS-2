import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository'
import { DeletePostUseCase } from '@/use-cases/posts/delete-post-use-case'
import z from 'zod'

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
  const deletePostParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
  })

  const { id } = deletePostParamsSchema.parse(request.params)
  const postsRepository = new PrismaPostsRepository()
  const deletePostUseCase = new DeletePostUseCase(postsRepository)

  await deletePostUseCase.execute({ id })

  return reply.status(204).send()
}




