import { Like, Prisma } from "@prisma/client";
import { LikesRepository } from "../likes-repository";
import { prisma } from "@/lib/prisma";

export class PrismaLikesRepository implements LikesRepository {
    async create(data: Prisma.LikeCreateInput) {
        return prisma.like.create({
            data
        })
    }
    async delete(id: number) {
        await prisma.like.delete({ where: { id } })
    }
    async findById(id: number) {
        return prisma.like.findUnique({ where: { id } });
    }
    async findManyByUserId(userId: number) {
        return prisma.like.findMany({ where: { userId } })
    }
    findManyByPostId(postId: number): Promise<Like[]> {
        return prisma.like.findMany({ where: { postId } })
    }
    findManyByCommentId(commentsId: number): Promise<Like[]> {
        return prisma.like.findMany({ where: { commentId: commentsId } })
    }
}