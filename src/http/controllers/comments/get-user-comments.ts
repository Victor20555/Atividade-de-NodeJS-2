import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repositroy";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserCommentsUseCase } from "@/use-cases/comments/get-user-comments-use-case";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getUserComments(request: FastifyRequest, reply: FastifyReply) {
    const getUserCommentsParamsSchema = z.object({
        userId: z.coerce.number().int().positive()
    })

    const { userId } = getUserCommentsParamsSchema.parse(request.params)

    const commentsRepository = new PrismaCommentsRepository()
    const userRepository = new PrismaUsersRepository()
    const getUserCommentsUseCase = new GetUserCommentsUseCase(commentsRepository, userRepository)

    try {
        const response = getUserCommentsUseCase.execute({ userId })
        return reply.status(200).send(response)
    } catch(error) {
        if (error instanceof UserNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}