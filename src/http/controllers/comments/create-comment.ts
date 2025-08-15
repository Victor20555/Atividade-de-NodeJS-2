import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PostNotFoundError } from '@/use-cases/errors/post-not-found-error'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { CreateCommentUseCase } from '@/use-cases/comments/create-comment-use-case'
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repositroy'

export async function createComment(request: FastifyRequest, reply: FastifyReply) {
  const createCommentBodySchema = z.object({
    content: z.string().min(1),
    postId: z.coerce.number().positive().int(),
  })

  const createCommentParamsSchema = z.object({
    postId: z.coerce.number().positive().int(),
  })

  try {
    const { content } = createCommentBodySchema.parse(request.body)
    const { postId } = createCommentParamsSchema.parse(request.params)
    const userId = request.userId

    const commentsRepository = new PrismaCommentsRepository();
    const usersRepository = new PrismaUsersRepository();
    const postsRepository = new PrismaPostsRepository();
    const createCommentUseCase = new CreateCommentUseCase(
        commentsRepository,
        usersRepository,
        postsRepository 
    );

    const response = await createCommentUseCase.execute({
      content,
      postId,
      userId: userId!
    })

    return reply.status(201).send(response)
  } catch (err) {
    if (err instanceof PostNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof UserNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
