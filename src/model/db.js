const posgres = require("postgres")

const db = {}

db.sql = posgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
})

db.FindByUsername = async (user, cb) => {
  try {
    let found = await db.sql`SELECT * FROM public.user WHERE userName = ${user.username}`
    if (found[0].username == user.username) {
      cb(null, user)
    }
  } catch(e) {
    cb(e, false)
  }
}

db.userNameExists = async (username) => {
  let response = await db.sql`SELECT EXISTS (SELECT * FROM public.user WHERE userName = ${username})`
  return response[0].exists
}

db.projectExists = async (projectName) => {
  let response = await db.sql`SELECT EXISTS (SELECT * FROM public.project WHERE LOWER(name) LIKE LOWER(${projectName}))`
  return response[0].exists
}


module.exports = db