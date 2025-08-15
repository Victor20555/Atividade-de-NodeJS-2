import { FastifyReply, FastifyRequest } from "fastify";
import { MissingPostAndCommentId } from "@/use-cases/errors/missing-post-and-comment-id-error";
import { SimultaneouslyPostAndCommentIdError } from "@/use-cases/errors/simultaneously-post-and-comment-id-error";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { PostNotFoundError } from "@/use-cases/errors/post-not-found-error";
import { CommentNotFoundError } from "@/use-cases/errors/comment-not-found-error";
import z from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repositroy";
import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { CreateLikeUseCase } from "@/use-cases/likes/create-like-use-case";

export async function createLike(request: FastifyRequest, reply: FastifyReply) {
    
    const createLikeBodySchema = z.object({
        postId: z.number().optional(),
        commentId: z.number().optional(),
    });

    if (!request.userId) {
        return reply.status(401).send({ message: "Usuário não autenticado" });
    }

    const { postId, commentId } = createLikeBodySchema.parse(request.body);
    const userId = request.userId;
    const postsRepository = new PrismaPostsRepository();
    const commentsRepository = new PrismaCommentsRepository();
    const usersRepository = new PrismaUsersRepository();
    const likesRepository = new PrismaLikesRepository();
    const createLikeUseCase = new CreateLikeUseCase(
        likesRepository,
        usersRepository,
        postsRepository,
        commentsRepository
    );
    

    try {

        const like = await createLikeUseCase.execute({
            userId,
            postId,
            commentId,
        });

        return reply.status(201).send(like);
    } catch (error) {
        if (error instanceof MissingPostAndCommentId) {
            return reply.status(400).send({ message: error.message });
        }

        if (error instanceof SimultaneouslyPostAndCommentIdError) {
            return reply.status(400).send({ message: error.message });
        }

        if (error instanceof UserNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        if (error instanceof PostNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        if (error instanceof CommentNotFoundError) {
            return reply.status(404).send({ message: error.message});
        }

        throw error;
    }
}