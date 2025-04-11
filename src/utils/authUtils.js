const util = {}

util.isAdmin = (req, res, next) => {
  if (req.user && req.user.usertype == "admin") {
    return next()
  }
  return res.status(403).json({error: "not authorized"})
}

module.exports = util