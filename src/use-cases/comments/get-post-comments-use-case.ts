import { CommentsRepository } from "@/repositories/comments-repository";
import { PostsRepository } from "@/repositories/posts-repository";
import { PostNotFoundError } from "../errors/post-not-found-error";

export class GetPostCommentsUseCase {
    constructor(private commentsRepository: CommentsRepository, private postsRepository: PostsRepository) { }
    async execute({ postId }: { postId: number }) {
        const post = await this.postsRepository.findById(postId)
        if (!post) {
            throw new PostNotFoundError();
        }
        return this.commentsRepository.findManyByPostId(postId)
    }
}