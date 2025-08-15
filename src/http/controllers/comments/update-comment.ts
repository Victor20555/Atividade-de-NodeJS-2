import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CommentNotFoundError } from '@/use-cases/errors/comment-not-found-error'
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repositroy'
import { UpdateCommentUseCase } from '@/use-cases/comments/update-comment-use-case'

export async function updateComment(request: FastifyRequest, reply: FastifyReply) {
  const updateCommentBodySchema = z.object({
    content: z.string().optional(),
  })

  const updateCommentParamsSchema = z.object({
    commentId: z.coerce.number().positive().int()
  })

  try {
    const { content } = updateCommentBodySchema.parse(request.body)
    const { commentId } = updateCommentParamsSchema.parse(request.params)
    const userId = request.userId

    const commentsRepository = new PrismaCommentsRepository()
    const updateCommentUseCase = new UpdateCommentUseCase(commentsRepository)

    const comment = await updateCommentUseCase.execute(
      commentId,
      content,
    )

    return reply.status(200).send(comment)
  } catch (error) {
    if (error instanceof CommentNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
