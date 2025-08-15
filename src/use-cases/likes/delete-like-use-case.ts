import { LikesRepository } from "@/repositories/likes-repository";

export class DeleteLikeUseCase {
  constructor(private likesRepository: LikesRepository) {}
  async execute({ id }: { id: number }) {
    await this.likesRepository.delete(id)
  }
}