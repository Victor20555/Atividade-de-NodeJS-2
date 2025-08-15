import {Comment, Prisma } from "@prisma/client";

export interface CommentsRepository {
    create(data: Prisma.CommentCreateInput): Promise<Comment>;
    findById(id: number): Promise<Comment | null>;
    delete(id: number): Promise<void>;
    update(id: number, data: Prisma.CommentUpdateInput): Promise<Comment>;
    findMany(): Promise<Comment[]>;
    findManyByUserId(userId: number): Promise<Comment[]>;
    findManyByPostId(userId: number): Promise<Comment[]>;

}