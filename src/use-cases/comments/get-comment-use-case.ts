import { CommentsRepository } from "@/repositories/comments-repository";
import { CommentNotFoundError } from "../errors/comment-not-found-error";

export class GetCommentUseCase {
    constructor(private commentsRepository: CommentsRepository) { }
    async execute({ id }: { id: number }) {
        const comment = await this.commentsRepository.findById(id);
        if (!comment) {
            throw new CommentNotFoundError();
        }
        return comment;
    }
}