const express = require("express")
const mongoose = require("mongoose")
const createServer = require("./server")
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5001

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    const app = createServer()
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch( (err) => {
    console.log(err)
  })