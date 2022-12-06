require("dotenv").config()
const corsConfig = require("./config/corsConfig")
//Express
const express = require("express")
const app = express()
//Middleware
const cors = require("cors")
const { logger } = require("./middleware/logEvents")
const { verifyJWT } = require("./middleware/verifyWebToken")
const morgan = require("./middleware/morgan")
const errorHandler = require("./middleware/errorHandler")
const cookieParser = require("cookie-parser")
//Mongo
const mongoUrl = process.env.MONGODB_URI
const mongoose = require("mongoose")
//Routes
const apiRoute = require("./routes/apiRoute")
const sessionRoute = require("./routes/sessionRoute")
const refreshRoute = require("./routes/refreshRoute")
const adminRoute = require("./routes/adminRoute")

app.use(cors(corsConfig))
app.use(express.json())
app.use(cookieParser())
app.use(morgan)
app.use(logger)
app.use("/favicon.ico", express.static("images/favicon.ico"))

mongoose.connect(mongoUrl).then(
  () => console.log("Connected to MongoDB!"),
  (err) => console.log("Failed to connect to MongoDb. Reason ", err)
)
mongoose.set("toJSON", { virtuals: true })

app.get("/", (req, res) => {
  res.send("Root of the server")
})


app.use(sessionRoute)
app.use(refreshRoute)
app.use(verifyJWT)
app.use("/admin", adminRoute)
app.use("/api", apiRoute)

app.use(errorHandler)

app.all("*", (req, res) => {
  res
    .status(404)
    .send("<h1 style='font-size: 50;text-align: center'>404 Not Found</h1>")
})

const PORT = process.env.PORT || 3010
app.listen(PORT, () => console.log("Server is running on port " + PORT))
