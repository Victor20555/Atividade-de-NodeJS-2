import { Prisma, User, Post } from "@prisma/client";

export interface FindManyWithPostsInterface {
    id: number;
    name: string;
    email: string;
    picture: string;
    posts: Post[];
}

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    findManyWithPosts(): Promise<Array<FindManyWithPostsInterface>>;
    delete(id: number): Promise<void>;
    update(id: number, data: Prisma.UserUpdateInput): Promise<User>;
}