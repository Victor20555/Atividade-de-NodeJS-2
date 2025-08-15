import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository"
import { LikeNotFoundError } from "@/use-cases/errors/like-not-found-error"
import { GetLikeUseCase } from "@/use-cases/likes/get-like-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function getLike(request: FastifyRequest, reply: FastifyReply) {
    const getLikeParamsSchema = z.object({
        id: z.coerce.number().int().positive(),
    })

    const { id } = getLikeParamsSchema.parse(request.params)
    const likesRepository = new PrismaLikesRepository()
    const getLikeUseCase = new GetLikeUseCase(likesRepository)
    
    try {
        const like = await getLikeUseCase.execute({ id })
        return reply.status(200).send(like)
    } catch (error) {
        if (error instanceof LikeNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
        throw error;
    }
}