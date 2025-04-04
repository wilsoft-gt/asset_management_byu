const passport = require("passport")
const router = require("express").Router()
const project = require("../controller/projectController")

router.get("/", passport.authenticate("jwt", {session: false}),project.getAll)
router.get("/:projectId", passport.authenticate("jwt", {session: false}), project.get)
router.post("/", passport.authenticate("jwt", {session: false}), project.create)
router.put("/:projectId", passport.authenticate("jwt", {session: false}), project.update)
router.delete("/:projectId", passport.authenticate("jwt", {session: false}), project.delete)

module.exports = router