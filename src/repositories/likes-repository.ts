import { Like, Prisma } from "@prisma/client";

export interface LikesRepository {
    create(data: Prisma.LikeCreateInput): Promise<Like>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Like | null>;
    findManyByUserId(userId: number): Promise<Like[]>;
    findManyByPostId(postId: number): Promise<Like[]>;
    findManyByCommentId(commentsId: number): Promise<Like[]>;
}

