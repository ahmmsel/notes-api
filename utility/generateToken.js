import jwt from "jsonwebtoken"

function generateToken(user) {
  return jwt.sign({
    id: user.id,
    name: user.name,
    email: user.email
  }, process.env.JWT_KEY, {
    expiresIn: "15d"
  })
}

export default generateToken