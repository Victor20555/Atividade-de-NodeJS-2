import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repositroy"
import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository"
import { CommentNotFoundError } from "@/use-cases/errors/comment-not-found-error"
import { GetCommentLikesUseCase } from "@/use-cases/likes/get-comment-likes-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function getCommentLike(request: FastifyRequest, reply: FastifyReply) {
    const getCommentLikeParamsSchema = z.object({
        commentId: z.coerce.number().int().positive(),
    })

    const { commentId } = getCommentLikeParamsSchema.parse(request.params)
    const likesRepository = new PrismaLikesRepository()
    const commentsRepository = new PrismaCommentsRepository()
    const getCommentLikeUseCase = new GetCommentLikesUseCase(likesRepository, commentsRepository)
    try {

        const like = await getCommentLikeUseCase.execute((commentId))
        return reply.status(200).send(like)
    } catch (error) {
        if (error instanceof CommentNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
        throw error;
    }
}


