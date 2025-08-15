import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"
import { RegisterUseCase } from "@/use-cases/users/register-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string().min(6),
        pic: z.url(),
    })
    
    const {name, email, password, pic} = registerBodySchema.parse(request.body)

    try {

        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)
        await registerUseCase.execute({
            name,
            email,
            password,
            pic
        })
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }

    }

    return reply.status(201).send('Usuário criado com sucesso')

}