export class ResourceNotFoundError extends Error {
    constructor(resource?: string) {
        super(`${resource ?? "recurso"} não foi encontrado!`);
    }
}