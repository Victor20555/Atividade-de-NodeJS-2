import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repositroy"
import { ListCommentsUseCase } from "@/use-cases/comments/list-comment-use-case"
import { FastifyReply, FastifyRequest } from "fastify"

export async function getAllComments(request: FastifyRequest, reply: FastifyReply) {
    
    const commentsRepository = new PrismaCommentsRepository()
    const getAllCommentsUseCase = new ListCommentsUseCase(commentsRepository)
    const response = getAllCommentsUseCase.execute()
    return reply.status(200).send(response)
}