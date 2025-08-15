import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository"
import { DeleteLikeUseCase } from "@/use-cases/likes/delete-like-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function deleteLike(request: FastifyRequest, reply: FastifyReply) {
    const deleteLikeParamsSchema = z.object({
        id: z.coerce.number().int().positive(),
    })

    const { id } = deleteLikeParamsSchema.parse(request.params)
    const likesRepository = new PrismaLikesRepository()
    const deleteLikeUseCase = new DeleteLikeUseCase(likesRepository)

    await deleteLikeUseCase.execute({ id })

    return reply.status(204).send()
}