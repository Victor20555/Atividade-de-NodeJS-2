import { InvalidCredentialsError } from "./invalid-credencials-error";

export class InvalidEmailError extends InvalidCredentialsError {
    constructor() {
        super("email inválido");
    }
}