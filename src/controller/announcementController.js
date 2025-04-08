const db = require("../model/db")

const announcement = {}

announcement.getAll = async (req, res) => {
  try {
    if (req.user.usertype == "admin") {
      const result = await db.sql`SELECT * FROM public.announcement`
      return res.status(200).json(result)
    } else {
      const result = await db.sql`SELECT * FROM public.announcement WHERE active = 1`
      return res.status(200).json(result)
    }
  } catch(e) {
    console.log(e)
    return res.status(500).json({error: "Couldn't get the announcements"})
  }
}

announcement.create = async (req, res) => {
  try {
    const result = await db.sql`INSERT INTO announcement (${db.sql(Object.keys(req.body))}) VALUES ${db.sql(Object.values(req.body))} returning *`
    return res.status(200).json(result)
  } catch(e) {
    console.log(e)
    return res.status(500).json({error: "Couldn't create the announcement"})
  }
}


announcement.togle = async (req, res) => {
  try {
    const result = await db.sql`SELECT * FROM announcement WHERE id = ${req.params.announcementId}`
    const final = await db.sql`UPDATE announcement SET active = ${result[0].active == 1 ? 0 : 1} WHERE id = ${req.params.announcementId} returning *`
    return res.status(200).json(final)
  } catch(e) {
    console.log(e)
    return res.status(500).json({error: "Couldn't update the announcement"})
  }
}


announcement.delete = async (req, res) => {
  try {
    const result = await db.sql`DELETE FROM announcement WHERE id = ${req.params.announcementId}`
    return res.status(204).json(result)
  } catch(e) {
    return res.status(500).json({error: "Couldn't delete the announcement"})
  }
}


module.exports = announcement