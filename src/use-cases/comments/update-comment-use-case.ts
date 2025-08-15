import { CommentsRepository } from "@/repositories/comments-repository";
import { CommentNotFoundError } from "../errors/comment-not-found-error";

export class UpdateCommentUseCase {
    constructor(private commentsRepository: CommentsRepository) { }
    async execute(id: number, content: string | undefined) {
        const comment = await this.commentsRepository.findById(id)
        if (!comment) {
            throw new CommentNotFoundError();
        }
        const updateData: Record<string, any> = {};
        if (content !== undefined) {
            updateData.content = content;
        }
        return await this.commentsRepository.update(id, updateData);
    }
}