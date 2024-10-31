import { json } from 'express'
import { getUsers, addUser, updateUser, deleteUser } from '../db.js'

import Joi from 'joi'

const addRule = Joi.object({
  email: Joi.string().required().min(10).max(30),
  nev: Joi.string().required().min(3).max(10)
})

const updateRule = Joi.object({
  nev: Joi.string().required().min(3).max(10),
  email: Joi.string().required().min(10).max(30)
  // id: Joi.number().required()
})
async function GetUsers(req, res) {
  res.send(await getUsers())
}

async function AddUser(req, res) {
  try {
    // const user = req.body
    // await AddUser(user.nev, user.email)
    const { email, nev } = await addRule.validateAsync(req.body) //email,nev
    await addUser(nev, email)
    res.send('Felhasznalo hozzaadva')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function UpdateUser(req, res) {
  try {
    const { nev, email } = await updateRule.validateAsync(req.body) //email,nev
    const { id } = req.params
    await updateUser(nev, email, id)
    res.send('Felhasznalok frissitve')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function DeleteUser(req, res) {
  const { id } = req.params
  // const { email, nev } = reg.body
  res.send(await deleteUser(id))
}

export const userController = {
  GetUsers,
  AddUser,
  UpdateUser,
  DeleteUser
}
