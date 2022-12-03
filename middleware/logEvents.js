const { format: formatDate } = require("date-fns")
const { v4: uuid } = require("uuid")
const path = require("path")
const fs = require("fs")
const fsPromises = require("fs").promises

const logEvents = async (message, fileName) => {
  const dateTime = formatDate(new Date(), '[dd-MM-yyyy]\tHH:mm:ss')
  const formatted = `${dateTime}\t${uuid()}\t${message}\n`
  try {
      if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
        await fsPromises.mkdir(path.join(__dirname, "..", "logs"))
      }
      await fsPromises.appendFile(path.join(__dirname, "..", "logs", fileName), formatted)
  } catch (err) {
    console.log(err)
  }
}

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reguestLog.txt")
  next()
}

module.exports = { logger, logEvents }