import { LikesRepository } from "@/repositories/likes-repository";
import { MissingPostAndCommentId } from "../errors/missing-post-and-comment-id-error";
import { SimultaneouslyPostAndCommentIdError } from "../errors/simultaneously-post-and-comment-id-error";
import { CommentsRepository } from "@/repositories/comments-repository";
import { PostsRepository } from "@/repositories/posts-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { UserNotFoundError } from "../errors/user-not-found-error";
import { PostNotFoundError } from "../errors/post-not-found-error";
import { CommentNotFoundError } from "../errors/comment-not-found-error";

export class CreateLikeUseCase {
    constructor(
        private likesRepository: LikesRepository,
        private usersRepository: UsersRepository,
        private postsRepository: PostsRepository,
        private commentsRepository: CommentsRepository
    ) { }

    async execute({ userId, postId, commentId }: { userId: number; postId: number | undefined; commentId: number | undefined }) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new UserNotFoundError();
        }
        if (!postId && !commentId) {
            throw new MissingPostAndCommentId();
        }
        if (postId && commentId) {
            throw new SimultaneouslyPostAndCommentIdError();
        }
        if (postId) {
            const post = await this.postsRepository.findById(postId);
            if (!post) {
                throw new PostNotFoundError();
            } 
            return this.likesRepository.create({
                user: { connect: { id: userId } },
                post: { connect: { id: postId } },
            });
        }
        else {
            const comment = await this.commentsRepository.findById(commentId!);
            if (!comment) {
                throw new CommentNotFoundError();
            }
            return this.likesRepository.create({
                user: { connect: { id: userId } },
                comment: { connect: { id: commentId! } },
            });
        }

    }
}
