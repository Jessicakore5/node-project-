import { Router } from 'express'
import { articleController } from '../controllers/article.js'

export const articleRouter = Router()

articleRouter.get('/', articleController.GetArticles)

articleRouter.post('/', articleController.AddArticles)

articleRouter.put('/:cikkId', articleController.UpdateArticles)

articleRouter.delete('/:cikkId', articleController.DeleteArticles)
