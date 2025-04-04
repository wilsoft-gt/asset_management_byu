const router = require("express").Router()
const user = require("../controller/userController")
const passport = require("passport")
const util = require("../utils/authUtils")


router.get("/",passport.authenticate("jwt", {session: false}), user.getAll)
router.post("/", passport.authenticate("jwt", {session: false}), user.create)
router.get("/:userId",passport.authenticate("jwt", {session: false}), user.get)
router.get("/:userId/assets", passport.authenticate("jwt", {session: false}), user.getUserAssets)
router.post("/:userId/assets/release", passport.authenticate("jwt", {session: false}), user.releaseAssets)
router.post("/:userId/assets/assign", passport.authenticate("jwt", {session: false}), user.assignAsset)
router.put("/:userId",passport.authenticate("jwt", {session: false}), user.updateUser)
router.delete("/:userId",passport.authenticate("jwt", {session: false}), util.isAdmin, user.deleteUser)



module.exports = router