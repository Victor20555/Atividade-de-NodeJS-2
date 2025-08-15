import { CommentsRepository } from "@/repositories/comments-repository";
import { LikesRepository } from "@/repositories/likes-repository";
import { Like } from "@prisma/client";
import { CommentNotFoundError } from "../errors/comment-not-found-error";

export class GetCommentLikesUseCase {
    constructor(private likesRepository: LikesRepository, private commentsRepository: CommentsRepository) { }
    async execute(commentId: number): Promise<Like[]> {
        const comment = await this.commentsRepository.findById(commentId);
        if (!comment) {
            throw new CommentNotFoundError();
        }
        return this.likesRepository.findManyByCommentId(commentId);
    }
}