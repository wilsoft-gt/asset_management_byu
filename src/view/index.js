const router = require("express").Router()
const auth = require("./authViews")
const project = require("./projectViews")
const user = require("./userView")
const asset = require("./assetViews")

router.use("/auth", auth)
router.use("/project", project)
router.use("/users", user)
router.use("/assets", asset)
router.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to the site!</h1>")
})

module.exports = router
