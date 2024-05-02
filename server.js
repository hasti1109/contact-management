const express = require("express")
const dotenv = require("dotenv").config()
const app = express()

const port = process.env.PORT || 5000

app.use(express.json()) //middleware that provides a parser which parses data received from client

app.use("/api/contacts", require("./routes/contactRoutes"));

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})