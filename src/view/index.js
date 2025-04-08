const router = require("express").Router()
const auth = require("./authViews")
const project = require("./projectViews")
const user = require("./userView")
const asset = require("./assetViews")
const announcement = require("./announcemenentView")

router.use("/auth", auth)
router.use("/projects", project)
router.use("/users", user)
router.use("/assets", asset)
router.use("/announcements", announcement)
router.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to the site!</h1>")
})

module.exports = router
