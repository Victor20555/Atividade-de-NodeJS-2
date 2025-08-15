import { LikesRepository } from "@/repositories/likes-repository";
import { Like } from "@prisma/client";
import { PostsRepository } from "@/repositories/posts-repository";
import { PostNotFoundError } from "../errors/post-not-found-error";

export class GetPostLikesUseCase {
    constructor(private likesRepository: LikesRepository, private postsRepository: PostsRepository) {}
    async execute(postId: number): Promise<Like[]> {
        const post = await this.postsRepository.findById(postId);
        if (!post) {
            throw new PostNotFoundError();
        }
        return this.likesRepository.findManyByPostId(postId);
    }
}

