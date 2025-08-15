import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repositroy";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { GetPostCommentsUseCase } from "@/use-cases/comments/get-post-comments-use-case";
import { PostNotFoundError } from "@/use-cases/errors/post-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getCommentsByPost(request: FastifyRequest, reply: FastifyReply) {
    const getCommentsByPostParamsSchema = z.object({
        postId: z.coerce.number().int().positive()
    })

    const { postId } = getCommentsByPostParamsSchema.parse(request.params)

    const commentsRepository = new PrismaCommentsRepository();
    const postsRepository = new PrismaPostsRepository();
    const getPostCommentsUseCase = new GetPostCommentsUseCase(
        commentsRepository,
        postsRepository,
    )
    

    try {
        const response = await getPostCommentsUseCase.execute({ postId })
        return reply.status(200).send(response)
    } catch(error) {
        if (error instanceof PostNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}