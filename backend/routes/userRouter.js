
import express from "express"
import { addUser, updateUser } from "../controllers/userController.js"
import { verifyUser } from "../middlewares/verifyUser.js"
import { checkRole } from "../middlewares/checkRole.js"

const userRouter = express.Router()

//demo
userRouter.get("/", (req, res) => res.send({ message: "user router is working" }))

//add
userRouter.post("/add/employee", verifyUser, checkRole(["admin", "super admin"]), addUser)

userRouter.post("/add/admin", verifyUser, checkRole(["super admin"]), addUser)

//update
userRouter.put("/update", verifyUser, updateUser)

//update password (using current password)
userRouter.patch("/changepass", verifyUser)



export default userRouter