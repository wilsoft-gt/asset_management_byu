const bcript = require("bcrypt")
const db = require("../model/db")
const jwt = require("jsonwebtoken")

const auth = {}


auth.register = async (req, res) => {
  /* Expects the following json
  {
    userName: "username",
    password: "mypassword"
    name: "Wilson Romero"
  }
  
  optional parameters:
  
  {
    ...
    enabled: 1/0,
    userType: 'user/admin'
  }
  
  */
  try {
    const {userName, password, name, userid} = req.body
    const hashedPass = await bcript.hash(password, 10)
    const result = await db.userNameExists(userName)
    if (!result) {
      const user = await db.sql`INSERT INTO public.user (name, userid) values (${name}, ${userid}) returning *`
      const auth = await db.sql`INSERT INTO public.auth (username, password, fk_user_id) values (${userName}, ${hashedPass}, ${user[0].id}) returning *`
      delete auth[0].password
      return res.status(200).json({...user[0], ...auth[0]})
    } else {
      return res.status(500).json({error: "user already exists"})
    }
  } catch(e) {
    console.log(e)
    if (e && e.routine == "_bt_check_unique") return res.status(500).json({error: "user already exists."})
    return res.status(500).json({error: "Could not sign up."})
  }
}

auth.login = async (req, res) => {
  try {
    const {username, password} = req.body
    const savedUser = await db.sql`SELECT * FROM public.auth WHERE userName = ${username}`
    if (!savedUser[0] || !savedUser[0].username)  return res.status(401).json({error: "user not found"})
    const passwordMatch = await bcript.compare(password, savedUser[0].password)
    if (!passwordMatch) return res.status(401).json({error: "password doesn't match"})
    delete savedUser[0].password
    const userInfo = await db.sql`SELECT * FROM public.user WHERE id = ${savedUser[0].fk_user_id}`
    let token = jwt.sign({...savedUser[0], ...userInfo[0]}, "thisisthesecretstringthatwillbepased", {expiresIn: "1h"})
    return res.status(200).json({token});
  } catch(e) {
    return res.status(500).json({error: "Cannot authenticate"})
  }
}

auth.checkToken = async(req, res) => {
  try {
    const isValidData = req.user
    return res.status(200).json(isValidData)
  } catch(e) {
    res.status(200).json({error: "There was an error"})
  }
}



module.exports = auth