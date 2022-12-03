const { logEvents } = require("./logEvents")

const errorHandler = (err, req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}\t${err}`, "errorLog.txt")
  res.status(500).send("Internal Server Error: " + err)
}

module.exports = errorHandler