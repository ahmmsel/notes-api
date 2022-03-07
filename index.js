import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import connectDB from "./db/connectDB.js"
import userRoutes from "./routes/user-route.js"
import noteRoutes from "./routes/note-route.js"
import checkAuth from "./middleware/auth-middleware.js"
import errorHandler from "./middleware/error-middleware.js"

dotenv.config()

const app = express()

// use middleware
app.use(express.json())

app.use(cors())

app.use(express.urlencoded({ extended: false }))

// routes
app.use("/api/v1/notes", checkAuth, noteRoutes)

app.use(errorHandler);

app.use("/api/v1/user", userRoutes)

const PORT = 5000

connectDB()
.then(() => {
  app.listen(PORT, () => console.log("http://localhost:" + PORT))
})
.catch(err => console.log(err))
