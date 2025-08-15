import { ResourceNotFoundError } from "./resource-not-found-error";

export class LikeNotFoundError extends ResourceNotFoundError {
    constructor() {
        super("Like");  
    }
}