const util = {}

util.isAdmin = (req, res, next) => {
  console.log(req.user.usertype)
  if (req.user && req.user.usertype == "admin") {
    return next()
  }
  return res.status(403).json({error: "not authorized"})
}

module.exports = util