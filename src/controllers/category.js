// TODO: GetCategory, AddCategory, UpdateCategory, DeleteCategory
import { json } from 'express'
import {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory
} from '../db.js'

import Joi from 'joi'

const addRule = Joi.object({
  kategoriaNev: Joi.string().required().min(5)
})

const updateRule = Joi.object({
  kategoriaNev: Joi.string().required().min(5).max(20)
  // id: Joi.number().required()
})

async function GetCategory(reg, res) {
  res.send(await getCategory())
}

async function AddCategory(req, res) {
  try {
    const { kategoriaNev } = await addRule.validateAsync(req.body)
    await addCategory(kategoriaNev)
    res.send('Kategoria hozzaadva')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function UpdateCategory(req, res) {
  try {
    const { kategoriaNev } = await updateRule.validateAsync(req.body)
    const { id } = req.params
    await updateCategory(kategoriaNev, id)
    res.send('Kategoria frissitve')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function DeleteCategory(req, res) {
  const { id } = req.params
  res.send(await deleteCategory(id))
}

export const categoryController = {
  GetCategory,
  AddCategory,
  UpdateCategory,
  DeleteCategory
}
