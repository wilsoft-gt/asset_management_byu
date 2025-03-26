const router = require("express").Router()
const auth = require("../controller/authController")
const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const db = require("../model/db")

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: "thisisthesecretstringthatwillbepased"
  }, function(jwt_payload, done) {
      db.FindByUsername(jwt_payload, function (err, user) {
        if (err) {
          return done(err, false)
        }
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
  })
)


router.post("/signup", auth.register)
router.post("/login", auth.login)
router.post("/check", passport.authenticate("jwt", {session: false}), auth.checkToken)


module.exports = router