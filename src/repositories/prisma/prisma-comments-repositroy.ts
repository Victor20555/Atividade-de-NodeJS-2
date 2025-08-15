import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { CommentsRepository } from "../comments-repository"

export class PrismaCommentsRepository implements CommentsRepository {
    async create(data: Prisma.CommentCreateInput) {
        return prisma.comment.create({
            data
        })
    }
    async findById(id: number) {
        return prisma.comment.findUnique({ where: { id } });
    }
    async delete(id: number) {
        await prisma.comment.delete({ where: { id } })
    }
    async update(id: number, data: Prisma.CommentUpdateInput) {
        return prisma.comment.update({ where: { id }, data })
    }
    async findMany() {
        return prisma.comment.findMany()
    }
    async findManyByUserId(userId: number) {
        return prisma.comment.findMany({ where: { userId } })
    }
    async findManyByPostId(postId: number) {
        return prisma.comment.findMany({ where: { postId } })
    }
}