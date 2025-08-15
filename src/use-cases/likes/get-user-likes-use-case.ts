import { LikesRepository } from "@/repositories/likes-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { UserNotFoundError } from "../errors/user-not-found-error";

export class GetUserLikesUseCase {
  constructor(private likesRepository: LikesRepository, private usersRepository: UsersRepository) {}
    async execute({ userId }: { userId: number }) {
        const user = await this.usersRepository.findById(userId);
        if(!user) {
          throw new UserNotFoundError();
        }
        return this.likesRepository.findManyByUserId(userId);
    }
}