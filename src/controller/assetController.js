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

asset.getDetails = async (req, res) => {
  try {
    const result = await db.sql`
      SELECT
        pa.id,
        pa.serial,
        pa.model,
        pa.brand,
        pa.size,
        pa.disposed,
        pa.disposed_date,
        pa.disposed_reason,
        pa.type,
        CASE
          WHEN pa.fk_user_id IS NOT NULL THEN
            jsonb_build_object(
            'id',pu.id,
            'userid', pu.userid,
            'name', pu.name
            )
          ELSE 
            NULL
        END AS assigned_to 
      FROM public.asset pa
      LEFT JOIN public.user pu on pa.fk_user_id = pu.id
      WHERE pa.id = ${req.params.assetId};
    `
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
    return res.status(200).json(result)
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

asset.getStats = async (req, res) => {
  try {
    const result = await db.sql`
    SELECT 
      type,
      COUNT(*) AS total_assets,
      COUNT(CASE WHEN disposed = 1 THEN 1 END) AS disposed_assets,
      COUNT(CASE WHEN disposed = 0 THEN 1 END) AS non_disposed_assets,
      COUNT(CASE WHEN fk_user_id IS NOT NULL THEN 1 END) AS assigned_to_user,
      COUNT(CASE WHEN fk_user_id IS NULL THEN 1 END) AS not_assigned_to_user
    FROM 
      public.asset
    GROUP BY 
      type;
    `
    return res.status(200).json(result)
  } catch(e) {
    console.log(e)
    return res.status(500).json({error: e})
  }
}


module.exports = asset