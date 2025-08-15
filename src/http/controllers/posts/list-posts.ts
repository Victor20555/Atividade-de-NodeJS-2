import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository'
import { ListPostsUseCase } from '@/use-cases/posts/list-posts-use-case'

export async function listPosts(request: FastifyRequest, reply: FastifyReply) {
  const postsRepository = new PrismaPostsRepository()
  const listPostsUseCase = new ListPostsUseCase(postsRepository)

  const posts = await listPostsUseCase.execute()
  return reply.status(200).send(posts)
}
