const express = require("express")
const app = express()
const views = require("./src/view/index.js")


app.use(express.json())

app.use(views)
app.listen(port = process.env.PORT || 3000, () => {
  console.log(`App running at ${process.env.HOST}:${port}`)
})