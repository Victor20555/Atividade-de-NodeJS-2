import { ResourceNotFoundError } from "./resource-not-found-error";

export class CommentNotFoundError extends ResourceNotFoundError {
    constructor() {
        super("Comentário");
}
}