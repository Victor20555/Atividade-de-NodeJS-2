import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CommentNotFoundError } from '@/use-cases/errors/comment-not-found-error'
import { GetCommentUseCase } from '@/use-cases/comments/get-comment-use-case'
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repositroy'

export async function getComment(request: FastifyRequest, reply: FastifyReply) {
  const getCommentParamsSchema = z.object({
    commentId: z.coerce.number().positive().int()
  })

  try {
    const { commentId } = getCommentParamsSchema.parse(request.params)

    const commentsRepository = new PrismaCommentsRepository();
    const getCommentUseCase = new GetCommentUseCase(
      commentsRepository,
    )

    const response = await getCommentUseCase.execute({
      id: commentId,
    })

    return reply.status(200).send(response)
  } catch (err) {
    if (err instanceof CommentNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
