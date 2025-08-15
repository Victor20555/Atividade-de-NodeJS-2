
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
    async update(id: number, data: Prisma.UserUpdateInput) {
      return await prisma.user.update({ where: { id }, data })
    }
    async delete(id: number) {
        await prisma.user.delete({ where: { id } })
    }
    async findManyWithPosts() {
        return prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                picture: true,
                posts: true,
            },
        });
    }
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        })
        return user

    }
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })
        return user
    }

    async findById(id: number) {
        return prisma.user.findUnique({ where: { id } });
    }
}
