import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import User from "../model/user-model.js"

const checkAuth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization

  try {
    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    req.user = await User.findById(decoded.id)
    next()
  } catch (error) {
    res.status(401)
    throw new Error("not authorized")
  }
})

export default checkAuth