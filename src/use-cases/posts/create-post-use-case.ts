import { PostsRepository } from "@/repositories/posts-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface CreatePostUseCaseRequest {
  title: string;
  content: string;
  userId: number;
}

export class CreatePostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({ title, content, userId }: CreatePostUseCaseRequest) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }
    return this.postsRepository.create({
      title,
      content,
      user: { connect: { id: userId } },
    });
  }
}

