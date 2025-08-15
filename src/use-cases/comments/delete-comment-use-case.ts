import { CommentsRepository } from "@/repositories/comments-repository";

export class DeleteCommentUseCase {
    constructor(private commentsRepository: CommentsRepository) { }
    async execute({ id }: { id: number }) {
        await this.commentsRepository.delete(id)
    }
}