const db = require("../model/db")

const user = {}


user.create = async (req, res) => {
  try {
    const {name, userid} = req.body
    const useridExists = await db.useridExists(userid)
    if (useridExists) return res.status(400).json({error: "user id already exists"})
    const user = await db.sql`INSERT INTO public.user (name, userid) values (${name}, ${userid}) returning *`
    return res.status(200).json(user)
  } catch(e) {
    return res.status(500).json({error: JSON.stringify(e)})
  }
}

user.getAll = async (req, res) => {
  try {
    const users = await db.sql`SELECT * FROM public.user`
    res.status(200).json(users)
  } catch(e) {
    res.status(500).json({error: JSON.stringify(e)})
  }
}

user.get = async (req, res) => {
  try {
    const user = await db.sql`SELECT * FROM public.user WHERE id = ${req.params.userId}`
    res.status(200).json(user)
  } catch(e) {
    res.status(500).json({error: "There was an error retrieving the user"})
  }
}

user.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId
    const result = await db.sql`UPDATE public.user SET ${db.sql(req.body)} WHERE id = ${userId} returning *`
    delete result[0].password
    return res.status(200).json(result)
  } catch (e) {
    if (e && e.routine == "_bt_check_unique") return res.status(500).json({error: "user already exists."})
    return res.status(500).json({error: "could not update the user"})
  }
}

user.deleteUser = async (req, res) => {
  try {
    const result = await db.sql`DELETE FROM public.user WHERE id = ${req.params.userId}`
    return res.status(204).json(result[0])
  } catch(e) {
    return res.status(500).json({error: e})
  }
}

user.getUserAssets = async (req, res) => {
  try {
    const result = await db.sql`SELECT id, serial, model, brand, size, type FROM asset WHERE fk_user_id = ${req.params.userId}`
    return res.status(200).json(result)
  } catch(e) {
    return res.status(500).json({error: e})
  }
}

user.assignAsset = async (req, res) => {
  try {
    const result = await db.sql`UPDATE asset SET fk_user_id = ${req.params.userId} WHERE id IN ${db.sql(req.body.assets)} RETURNING id, serial, model, brand, size, type`
    return res.status(200).json(result)
  } catch(e) {
    console.error(e)
    return res.status(500).json({error: e})
  }
}

user.releaseAssets = async (req, res) => {
  try {
    const result = await db.sql`UPDATE asset SET fk_user_id = null WHERE fk_user_id = ${req.params.userId}`
    return res.status(204).json({result})
  } catch(e) {
    return res.status(500).json({error: e})
  }
}

module.exports = user