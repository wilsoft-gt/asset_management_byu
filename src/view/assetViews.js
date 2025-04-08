const passport = require("passport")
const router = require("express").Router()
const asset = require("../controller/assetController")

router.get("/", passport.authenticate("jwt", {session: false}), asset.getAll)
router.get("/:assetId", passport.authenticate("jwt", {session: false}), asset.get)
router.post("/", passport.authenticate("jwt", {session: false}), asset.create)
router.post("/serial", passport.authenticate("jwt", {session: false}), asset.getBySerial)
router.post("/:assetId/assign", passport.authenticate("jwt", {session: false}), asset.assignToUser)
router.put("/:assetId", passport.authenticate("jwt", {session: false}), asset.update)
router.delete("/:assetId", passport.authenticate("jwt", {session: false}), asset.delete)
router.post("/:assetId/release", passport.authenticate("jwt", {session: false}), asset.release)

module.exports = router