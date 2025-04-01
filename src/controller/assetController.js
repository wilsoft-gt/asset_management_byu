const db = require("../model/db")

const asset = {}

asset.getAll = async (req, res) => {
  try {
    const result = await db.sql`SELECT * FROM asset`
    return res.status(200).json(result)
  } catch(e) {
    return res.status(500).json({error: e})
  }
}


asset.get = async (req, res) => {
  try {
    const result = await db.sql`SELECT * FROM asset WHERE id = ${req.params.assetId}`
    return res.status(200).json(result)
  } catch(e) {
    return res.status(500).json({error: e})
  }
}


asset.create = async (req, res) => {
  try {
    const {serial, model, brand} = req.body
    const result = await db.sql`INSERT INTO asset (serial, model, brand) values (${serial}, ${model}, ${brand}) returning *`
    return res.status(201).json(result)
  } catch(e) {
    return res.status(500).json({error: e})
  }
}


asset.update = async (req, res) => {
  try {
    const result = await db.sql`UPDATE asset SET ${db.sql(req.body)} WHERE id = ${req.params.assetId} returning *`
    return res.status(200).json(result)
  } catch(e) {
    return res.status(500).json({error: e})
  }
}


asset.delete = async (req, res) => {
  try {
    const result = await db.sql`DELETE FROM asset WHERE id = ${req.params.assetId} returning *`
    return res.status(204).json({result})
  } catch(e) {
    return res.status(500).json({error: e})
  }
}


asset.assignToUser = async (req, res) => {
  try {
    const result = await db.sql`UPDATE asset SET fk_user_id = ${req.body.userId} WHERE id = ${req.params.assetId} returning *`
    return res.status(204).json(result)
  } catch(e) {
    return res.status(500).json({error: e})
  }
}


asset.release = async (req, res) =>{
  try {
    const result = await db.sql`UPDATE asset SET fk_user_id = NULL where id = ${req.params.assetId} returning *`
    return res.status(204).json(result)
  } catch(e) {
    return res.status(500).json({error: e})
  }
}



module.exports = asset