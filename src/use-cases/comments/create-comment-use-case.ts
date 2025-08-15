import { CommentsRepository } from "@/repositories/comments-repository";
import { PostsRepository } from "@/repositories/posts-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { UserNotFoundError } from "../errors/user-not-found-error";
import { PostNotFoundError } from "../errors/post-not-found-error";


export class CreateCommentUseCase {
    constructor(
        private commentsRepository: CommentsRepository,
        private usersRepository: UsersRepository,
        private postsRepository: PostsRepository
    ) { }

    async execute({ userId, postId, content }: { userId: number; postId: number; content: string }) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new UserNotFoundError();
        }
        const post = await this.postsRepository.findById(postId);
        if (!post) {
            throw new PostNotFoundError();
        }
        return this.commentsRepository.create({
            content,
            post: { connect: { id: postId } },
            user: { connect: { id: userId } },
        });
    }
}