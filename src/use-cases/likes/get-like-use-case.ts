import { LikesRepository } from "@/repositories/likes-repository";
import { LikeNotFoundError } from "../errors/like-not-found-error";

export class GetLikeUseCase {
    constructor(private likesRepository: LikesRepository) { }
    async execute({ id }: { id: number }) {
        const like = await this.likesRepository.findById(id);
        if (!like) {
            throw new LikeNotFoundError();
        }
        return like;
    }
}
