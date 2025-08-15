import { FastifyInstance } from 'fastify'
import { createPost } from '@/http/controllers/posts/create-post'
import { listPosts } from '@/http/controllers/posts/list-posts'
import { deleteUser } from '@/http/controllers/users/delete-user'
import { deletePost } from '@/http/controllers/posts/delete-post'
import { updateUser } from '@/http/controllers/users/update-user'
import { updatePost } from '@/http/controllers/posts/update-post'
import { getUser } from '@/http/controllers/users/get-user'
import { getPost } from '@/http/controllers/posts/get-post'
import { getUserPosts } from '@/http/controllers/posts/get-user-posts'
import { authenticate } from '@/http/controllers/users/authenticate'
import { listUsers } from './controllers/users/list-users'
import { register } from './controllers/users/register'
import { authenticateMiddleware } from './middlewares/authenticate'
import { createComment } from './controllers/comments/create-comment'
import { getComment } from './controllers/comments/get-comment'
import { getAllComments } from './controllers/comments/get-all-comments'
import { updateComment } from './controllers/comments/update-comment'
import { deleteComment } from './controllers/comments/delete-comment'
import { getCommentsByPost } from './controllers/comments/get-comments-by-post'
import { getUserComments } from './controllers/comments/get-user-comments'
import { createLike } from './controllers/likes/create-like'
import { deleteLike } from './controllers/likes/delete-like'
import { getCommentLike } from './controllers/likes/get-comment-like'
import { getLike } from './controllers/likes/get-like'
import { getPostLikes } from './controllers/likes/get-post-likes'
import { getUserLikes } from './controllers/likes/get-user-likes'

export async function appRoutes(app: FastifyInstance) {
  app.post('/posts', {preHandler: [authenticateMiddleware]}, createPost)
  app.get('/users', listUsers)
  app.get('/posts', listPosts)
  app.get('/posts/:id', getPost)
  app.get('/users/:id', getUser)
  app.get('/users/:id/posts', getUserPosts)
  app.get('/comments/:commentId', getComment)
  app.get('/comments', getAllComments)
  app.get('/likes/comments/:commentId', getCommentLike)
  app.get('/likes/:id', getLike)
  app.get('/likes/posts/:id', getPostLikes)
  app.get('/likes/user/:id', getUserLikes)
  app.get('/posts/:postId/comments', getCommentsByPost)
  app.post('/likes', {preHandler: [authenticateMiddleware]}, createLike)
  app.delete('/users',{preHandler: [authenticateMiddleware]}, deleteUser)
  app.delete('/posts/:id', {preHandler: [authenticateMiddleware]}, deletePost)
  app.patch('/users', {preHandler: [authenticateMiddleware]},updateUser)
  app.patch('/posts/:id',{preHandler: [authenticateMiddleware]}, updatePost)
  app.post('/auth', authenticate)
  app.post('/users', register)
  app.post('/posts/:postId/comments', {preHandler: [authenticateMiddleware]}, createComment)
  app.patch('/comments/:commentId', {preHandler: [authenticateMiddleware]}, updateComment)
  app.delete('/comments/:commentId', {preHandler: [authenticateMiddleware]}, deleteComment)
  app.delete('/likes/:id', {preHandler: [authenticateMiddleware]}, deleteLike)
}