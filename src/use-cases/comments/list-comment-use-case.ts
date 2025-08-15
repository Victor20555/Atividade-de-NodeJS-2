import { CommentsRepository } from "@/repositories/comments-repository";
import { Comment } from "@prisma/client";

export class ListCommentsUseCase {
  constructor(private commentsRepository: CommentsRepository) {}
  async execute(): Promise<Comment[]> {
    return this.commentsRepository.findMany();
  }
}
