import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
    pic: string;
}
  


export class RegisterUseCase{
    constructor(private usersRepository: UsersRepository) {}

    async execute({name, email, password, pic}: RegisterUseCaseRequest) {

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if(userWithSameEmail) {
        throw new UserAlreadyExistsError()
   
    }

    const passwordHash = await hash(password, 6)

    await this.usersRepository.create({
        name,
        email,
        passwordHash,
        picture: pic,
    })

    }  
}