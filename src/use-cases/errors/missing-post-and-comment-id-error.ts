export class MissingPostAndCommentId extends Error {
    constructor() {
       super('Id de comentários e de posts simultaneamente ausentes!')
    } 
        
}