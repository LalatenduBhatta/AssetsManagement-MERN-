import express from "express"
import { verifyUser } from "../middlewares/verifyUser.js"
import { checkRole } from "../middlewares/checkRole.js"
import { addAssetItem } from "../controllers/assetItemController.js"

const assetItemRouter = express.Router()

//add
assetItemRouter.post("/add", verifyUser, checkRole(["super admin", "admin"]), addAssetItem)





export default assetItemRouter