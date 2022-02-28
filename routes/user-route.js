import { Router } from "express";
import { loginUser, myAccount, registerUser } from "../controllers/user-controllers.js";

const router = Router()
// register user
router.route("/register").post(registerUser)
// login user
router.route("/login").post(loginUser)
// my account
router.route("/my-account").get(myAccount)

export default router