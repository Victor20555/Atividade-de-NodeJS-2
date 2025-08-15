import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PostsRepository } from "../posts-repository";

export class PrismaPostsRepository implements PostsRepository {
  async create(data: Prisma.PostCreateInput) {
    return prisma.post.create({ data });
  }
  async findById(id: number) {
    return prisma.post.findUnique({ where: { id } });
  }
  async findManyByUserId(userId: number) {
    return prisma.post.findMany({ where: { userId } })
  }
  async update(id: number, data: Partial<Omit<import("@prisma/client").Post, 'id'>>) {
    await prisma.post.update({ where: { id }, data })
  }
  async delete(id: number) {
    await prisma.post.delete({ where: { id } })
  }
  async findManyWithUser() {
    return prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            picture: true,
          },
        },
      },
    })
  }
}
