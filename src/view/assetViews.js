const passport = require("passport")
const router = require("express").Router()
const asset = require("../controller/assetController")

router.get("/", asset.getAll)
router.get("/:assetId", asset.get)
router.post("/", asset.create)
router.post("/serial", asset.getBySerial)
router.post("/:assetId/assign", asset.assignToUser)
router.put("/:assetId", asset.update)
router.delete("/:assetId", asset.delete)
router.post("/:assetId/release", asset.release)

module.exports = router