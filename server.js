const express = require("express")
const errorHandler = require("./middleware/errorHandler")
const dotenv = require("dotenv").config()
const app = express()
const connectDb = require('./config/dbConnection')

const port = process.env.PORT || 5000

connectDb();

app.use(express.json()) //middleware that provides a parser which parses data received from client

app.use("/api/contacts", require("./routes/contactRoutes"));

app.use(errorHandler)

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})