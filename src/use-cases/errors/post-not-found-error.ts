import { ResourceNotFoundError } from "./resource-not-found-error";

export class PostNotFoundError extends ResourceNotFoundError {
    constructor() {
        super("Post");
    }
}