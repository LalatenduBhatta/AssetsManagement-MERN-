import express from "express"
import { verifyUser } from "../middlewares/verifyUser.js"
import { checkRole } from "../middlewares/checkRole.js"
import { addAssetModel } from "../controllers/assetModelController.js"

const assetModelRouter = express.Router()

//add
assetModelRouter.post("/add", verifyUser, checkRole(["super admin", "admin"]), addAssetModel)





export default assetModelRouter