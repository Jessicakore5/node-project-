import { json } from 'express'

import {
  getComments,
  addComments,
  updateComments,
  deleteComments
} from '../db.js'

import Joi from 'joi'

const addRule = Joi.object({
  szoveg: Joi.string().required().min(100).max(2000)
})

const updateRule = Joi.object({
  szoveg: Joi.string().required().min(100).max(2000)
})

async function GetComments(req, res) {
  res.send(await getComments())
}

async function AddComments(req, res) {
  try {
    const { felhId, cikkId } = req.params
    const { szoveg } = await addRule.validateAsync(req.body)
    await addComments(felhId, cikkId, szoveg)
    res.send('hozzaszolas hozzaadva')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function UpdateComments(req, res) {
  try {
    const { hozzaszolasId, felhId, cikkId } = req.params
    const { szoveg } = await updateRule.validateAsync(req.body)
    await updateComments(hozzaszolasId, felhId, cikkId, szoveg)
    res.send('Hozzaszolas frissitve')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function DeleteComments(req, res) {
  const { hozzaszolasId } = req.params
  res.send(await deleteComments(hozzaszolasId))
}

export const commentsController = {
  GetComments,
  AddComments,
  UpdateComments,
  DeleteComments
}
