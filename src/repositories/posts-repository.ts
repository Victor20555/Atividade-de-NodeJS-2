import { Post, Prisma } from "@prisma/client";

export interface FindManyWithUserInterface {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    user: {
        id: number;
        name: string;
        email: string;
        picture: string;
    };
}

export interface PostsRepository {
  create(data: Prisma.PostCreateInput): Promise<Post>;
  findById(id: number): Promise<Post | null>;
  findManyWithUser(): Promise<Array<FindManyWithUserInterface>>;
  delete(id: number): Promise<void>;
  update(id: number, data: Prisma.PostUpdateInput): Promise<void>;
  findManyByUserId(userId: number): Promise<Post[]>;
}
