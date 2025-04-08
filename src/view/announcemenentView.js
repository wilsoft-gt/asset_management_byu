const passport = require("passport")
const router = require("express").Router()
const announcement = require("../controller/announcementController")

router.get("/",  passport.authenticate("jwt", {session: false}), announcement.getAll)
router.post("/",  passport.authenticate("jwt", {session: false}), announcement.create)
router.put("/:announcementId",  passport.authenticate("jwt", {session: false}), announcement.togle)
router.delete("/:announcementId",  passport.authenticate("jwt", {session: false}), announcement.delete)

module.exports = router