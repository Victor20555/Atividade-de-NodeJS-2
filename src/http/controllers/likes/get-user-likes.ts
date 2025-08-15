import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error"
import { GetUserLikesUseCase } from "@/use-cases/likes/get-user-likes-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function getUserLikes(request: FastifyRequest, reply: FastifyReply) {
    const getUserLikesParamsSchema = z.object({
        id: z.coerce.number().int().positive(),
    })

    const { id } = getUserLikesParamsSchema.parse(request.params)
    const likesRepository = new PrismaLikesRepository()
    const usersRepository = new PrismaUsersRepository()
    const getUserLikesUseCase = new GetUserLikesUseCase(likesRepository, usersRepository)

    try {
        const likes = await getUserLikesUseCase.execute({ userId: (id) })
        return reply.status(200).send(likes)
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
        throw error;
    }
}