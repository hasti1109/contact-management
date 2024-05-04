const express = require("express")
const errorHandler = require("./middleware/errorHandler")

function createServer() {
	const app = express()
	app.use(express.json())
	app.use("/api/contacts", require("./routes/contactRoutes"))
  app.use(errorHandler)
	return app
}

module.exports = createServer