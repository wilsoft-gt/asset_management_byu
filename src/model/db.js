const posgres = require("postgres")

const db = {}

db.sql = posgres({
  host: "192.168.0.10",
  port: 3220,
  database: "assetManagementSystem",
  username: "postgres",
  password: "wilsoft"
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