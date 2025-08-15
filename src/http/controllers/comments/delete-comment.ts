import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repositroy'
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteCommentUseCase } from '@/use-cases/comments/delete-comment-use-case'
import { CommentNotFoundError } from '@/use-cases/errors/comment-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteComment(request: FastifyRequest, reply: FastifyReply) {
  const deleteCommentParamsSchema = z.object({
    commentId: z.coerce.number().positive().int()
  })

  const { commentId } = deleteCommentParamsSchema.parse(request.params)

  const commentsRepository = new PrismaCommentsRepository();
  const deleteCommentUseCase = new DeleteCommentUseCase(commentsRepository);

  await deleteCommentUseCase.execute({
      id: commentId,
  })

  return reply.status(204).send()
}

