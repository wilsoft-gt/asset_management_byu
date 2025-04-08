const db = require("../model/db")

const asset = {}

asset.getAll = async (req, res) => {
  try {
    const result = await db.sql`SELECT * FROM public.asset`
    return res.status(200).json(result)
  } catch(e) {
    console.log(e)
    return res.status(500).json({error: e})
  }
}


asset.get = async (req, res) => {
  try {
    const result = await db.sql`SELECT * FROM public.asset WHERE id = ${req.params.assetId}`
    return res.status(200).json(result)
  } catch(e) {
    return res.status(500).json({error: e})
  }
}


asset.getBySerial = async (req, res) => {
  try {
    const result = await db.sql`SELECT * FROM public.asset WHERE serial = ${req.body.serial}`
    return res.status(200).json(result)
  } catch(e) {
    return res.status(500).json({error: e})
  }
}


asset.create = async (req, res) => {
  try {    
    const result = await db.sql`INSERT INTO public.asset (${db.sql(Object.keys(req.body))}) values ${db.sql(Object.values(req.body))} returning *`
    return res.status(201).json(result)
  } catch(e) {
    console.log(e)
    if (e.routine == "_bt_check_unique") return res.status(400).json({error: "serial number already exists"})
    return res.status(500).json({error: e})
  }
}


asset.update = async (req, res) => {
  try {
    const result = await db.sql`UPDATE public.asset SET ${db.sql(req.body)} WHERE id = ${req.params.assetId} returning *`
    return res.status(200).json(result)
  } catch(e) {
    return res.status(500).json({error: e})
  }
}


asset.delete = async (req, res) => {
  try {
    const result = await db.sql`DELETE FROM public.asset WHERE id = ${req.params.assetId} returning *`
    return res.status(204).json({result})
  } catch(e) {
    return res.status(500).json({error: e})
  }
}


asset.assignToUser = async (req, res) => {
  try {
    const result = await db.sql`UPDATE public.asset SET fk_user_id = ${req.body.userId} WHERE id = ${req.params.assetId} returning *`
    return res.status(204).json(result)
  } catch(e) {
    return res.status(500).json({error: e})
  }
}


asset.release = async (req, res) =>{
  try {
    const result = await db.sql`UPDATE public.asset SET fk_user_id = NULL where id = ${req.params.assetId} returning *`
    return res.status(200).json(result)
  } catch(e) {
    return res.status(500).json({error: e})
  }
}



module.exports = asset