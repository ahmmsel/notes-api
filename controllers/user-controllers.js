import asyncHandler from "express-async-handler"
import User from "../model/user-model.js"
import bcrypt from "bcryptjs"
import generateToken from "../utility/generateToken.js"

const registerUser = asyncHandler(async (req, res) => {
  const { name, email,  password } = req.body

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    res.status(400)
    throw new Error("this user is exist")
  }

  const hashPassword = bcrypt.hash(password, 12)

  const user = await User.create({
    name,
    email,
    password: hashPassword
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user)
    })
  } else {
    res.status(400)
    throw new Error("Invalid data")
  }

})

const loginUser = asyncHandler(async (req, res) => {
  res.json({ data: "login" })
})

const myAccount = asyncHandler(async (req, res) => {
  res.json({ data: "my account" })
})

export {
  registerUser,
  loginUser,
  myAccount
}

