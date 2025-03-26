const util = {}

util.isAdmin = (req, res, next) => {
  if (res.user && res.user.userType == "admin") {
    return next()
  }
  return res.status(403).json({error: "not authorized"})
}

module.exports = util