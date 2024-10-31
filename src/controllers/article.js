import { json } from 'express'
import {
  getArticles,
  addArticles,
  updateArticles,
  deleteArticles
} from '../db.js'

import Joi from 'joi'

const addRule = Joi.object({
  cikkCim: Joi.string().required().min(5),
  szoveg: Joi.string().required().min(5).max(100),
  szerzoId: Joi.number().required()
})

const updateRule = Joi.object({
  cikkCim: Joi.string().required().min(5),
  cikkDatum: Joi.number().required(),
  szoveg: Joi.string().required().min(5).max(100)
})

async function GetArticles(req, res) {
  res.send(await getArticles())
}

async function AddArticles(req, res) {
  try {
    const { cikkCim, szerzoId, szoveg } = await addRule.validateAsync(req.body)
    await addArticles(cikkCim, szerzoId, szoveg)
    res.send('Cikk hozzaadva')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function UpdateArticles(req, res) {
  try {
    const { cikkCim, cikkDatum, szoveg } = await updateRule.validateAsync(
      req.body
    )
    await updateArticles(cikkCim, cikkDatum, szoveg)
    res.send('Cikk frissitve')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function DeleteArticles(req, res) {
  const { cikkId } = req.params
  await deleteArticles(cikkId)
  res.send('kitoroltem a cikket')
}

export const articleController = {
  GetArticles,
  AddArticles,
  UpdateArticles,
  DeleteArticles
}
