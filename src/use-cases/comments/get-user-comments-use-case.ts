import { CommentsRepository } from "@/repositories/comments-repository";
import { UserNotFoundError } from "../errors/user-not-found-error";
import { UsersRepository } from "@/repositories/users-repository";

export class GetUserCommentsUseCase {
    constructor(private commentsRepository: CommentsRepository, private userRepository: UsersRepository) { }
    async execute({ userId }: { userId: number }) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
        throw new UserNotFoundError();
    }
    return this.commentsRepository.findManyByUserId(userId);
}
}