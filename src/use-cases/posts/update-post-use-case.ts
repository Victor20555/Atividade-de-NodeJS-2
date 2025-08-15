import { PostsRepository } from '@/repositories/posts-repository'
import { PostNotFoundError } from '../errors/post-not-found-error'

interface UpdatePostUseCaseRequest {
  id: number
  title: string | undefined
  content: string | undefined
}

export class UpdatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}
  async execute({ id, title, content }: UpdatePostUseCaseRequest) {
    const post = await this.postsRepository.findById(id)

    if (!post) {
      throw new PostNotFoundError();
    }
    
    const updateData: { title?: string; content?: string } = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;

    await this.postsRepository.update(id, updateData)
  }
}

