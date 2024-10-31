import { Router } from 'express'
import { commentsController } from '../controllers/comments.js'

export const commentsRouter = Router()

commentsRouter.get('/', commentsController.GetComments)

commentsRouter.post('/', commentsController.AddComments)

commentsRouter.put('/:id', commentsController.UpdateComments)

commentsRouter.delete('/:id', commentsController.DeleteComments)
