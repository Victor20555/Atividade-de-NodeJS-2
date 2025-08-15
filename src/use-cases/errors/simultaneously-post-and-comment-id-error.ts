export class SimultaneouslyPostAndCommentIdError extends Error {
    constructor() {
       super('Id de comentários e de posts simultaneamente presentes!')
    }
}