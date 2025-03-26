const passport = require("passport")
const router = require("express").Router()
const asset = require("../controller/assetController")

router.get("/", asset.getAll)
router.get("/:assetId", asset.get)
router.post("/", asset.create)
router.post("/:assetId/assign", asset.assignToUser)
router.put("/update/:assetId", asset.update)
router.delete("/delete/:assetId", asset.delete)

module.exports = router