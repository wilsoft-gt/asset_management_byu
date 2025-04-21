const passport = require("passport")
const router = require("express").Router()
const asset = require("../controller/assetController")
const auth = require("../utils/authUtils")

router.get("/", passport.authenticate("jwt", {session: false}), asset.getAll)
router.get("/statistics", passport.authenticate("jwt", {session: false}), auth.isAdmin, asset.getStats)
router.post("/", passport.authenticate("jwt", {session: false}), asset.create)
router.get("/:assetId", passport.authenticate("jwt", {session: false}), asset.get)
router.get("/:assetId/details", passport.authenticate("jwt", {session: false}), asset.getDetails)
router.post("/serial", passport.authenticate("jwt", {session: false}), asset.getBySerial)
router.post("/:assetId/assign", passport.authenticate("jwt", {session: false}), asset.assignToUser)
router.put("/:assetId", passport.authenticate("jwt", {session: false}), asset.update)
router.delete("/:assetId", passport.authenticate("jwt", {session: false}), asset.delete)
router.post("/:assetId/release", passport.authenticate("jwt", {session: false}), asset.release)

module.exports = router