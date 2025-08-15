import { ResourceNotFoundError } from "./resource-not-found-error";

export class UserNotFoundError extends ResourceNotFoundError {
    constructor() {
       super('Usuário')
    }
    
}