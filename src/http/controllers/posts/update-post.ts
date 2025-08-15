import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository'
import { UpdatePostUseCase } from '@/use-cases/posts/update-post-use-case'
import z from 'zod'
import { PostNotFoundError } from '@/use-cases/errors/post-not-found-error'
import { th } from 'zod/v4/locales/index.cjs'

export async function updatePost(request: FastifyRequest, reply: FastifyReply) {

  const updatePostParamsSchema = z.object({
    id: z.coerce.number().positive().int()
  })
  const { id } = updatePostParamsSchema.parse(request.params)
  const updatePostSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional()
  })
  const data = updatePostSchema.parse(request.body)
  const postsRepository = new PrismaPostsRepository()
  const updatePostUseCase = new UpdatePostUseCase(postsRepository)

  try {
    const post = await updatePostUseCase.execute({
      id,
      title: data.title,
      content: data.content
    })
    return reply.status(200).send(post)
  } catch (error) {
    if (error instanceof PostNotFoundError)
      return reply.status(404).send({ message: error.message })

    throw error
  }
}