import express from 'express'
import {
  createUser,
  createCategory,
  createArticles,
  updateArticles,
  getArticles,
  addArticles,
  deleteArticles,
  updateCategory,
  createComments
} from './db.js'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { userRouter } from './routes/users.js'
import { categoryRouter } from './routes/category.js'
import { articleRouter } from './routes/article.js'
import { commentsRouter } from './routes/comments.js'

const app = express()

const port = 3001

app.use(bodyParser.json())

app.use(morgan('dev'))

app.use('/users', userRouter)

app.use('/categories', categoryRouter)

app.use('/articles', articleRouter)

app.use('/comments', commentsRouter)

app.get('/orszag', (req, res) => {
  res.send('orszag world ez az elso projektem')
})

app.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port}cimen`)
  // createUser()
  // createCategory()
  // updateCategory()
  // createArticles()
  // deleteArticles()
  // updateArticles()
})
