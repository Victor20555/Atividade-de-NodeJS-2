import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository"
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { PostNotFoundError } from "@/use-cases/errors/post-not-found-error"
import { GetPostLikesUseCase } from "@/use-cases/likes/get-post-likes-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function getPostLikes(request: FastifyRequest, reply: FastifyReply) {
    const getPostLikesParamsSchema = z.object({
        id: z.coerce.number().int().positive(),
    })

    const { id } = getPostLikesParamsSchema.parse(request.params)
    const likesRepository = new PrismaLikesRepository()
    const postsRepository = new PrismaPostsRepository()
    const getPostLikesUseCase = new GetPostLikesUseCase(likesRepository, postsRepository)

    try {
        const likes = await getPostLikesUseCase.execute(id)
        return reply.status(200).send(likes)
    } catch (error) {
        if (error instanceof PostNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
        throw error;
    }
}

