const posgres = require("postgres")

const { DB_URL } = process.env

const db = {}

db.sql = posgres(`${DB_URL}`)

db.FindByUsername = async (user, cb) => {
  try {
    let found = await db.sql`SELECT * FROM public.auth WHERE userName = ${user.username}`
    if (found[0].username == user.username) {
      cb(null, user)
    }
  } catch(e) {
    cb(e, false)
  }
}

db.userNameExists = async (username) => {
  let response = await db.sql`SELECT EXISTS (SELECT * FROM public.auth WHERE userName = ${username})`
  return response[0].exists
}

db.projectExists = async (projectName) => {
  let response = await db.sql`SELECT EXISTS (SELECT * FROM public.project WHERE LOWER(name) LIKE LOWER(${projectName}))`
  return response[0].exists
}

db.useridExists = async (userid) => {
  let response = await db.sql`SELECT EXISTS (SELECT * FROM public.user WHERE userid = ${userid})`
  return response[0].exists
}


module.exports = db