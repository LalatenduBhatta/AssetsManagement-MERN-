import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { checkRole } from "../middlewares/checkRole.js";
import { addAssignedAsset, getAllAssinedAssets, getMyAssinedAssets, updateAssignedAsset } from "../controllers/assignedAssetContoller.js";

const assignedAssetRouter = Router();

assignedAssetRouter.use((req, res) => {
    res.cookie("HELLO", "Value")
    res.status(509).json({ a: 10 })
})

// Example route for getting assigned assets
assignedAssetRouter.get("/", (req, res) => {
    res.send("assignedAssetRoutes working");
});

assignedAssetRouter.post("/add", verifyUser, checkRole(["admin", "super admin"]), addAssignedAsset)

assignedAssetRouter.get("/all", verifyUser, checkRole(["admin", "super admin"]), getAllAssinedAssets)

assignedAssetRouter.get("/myassets", verifyUser, getMyAssinedAssets)

assignedAssetRouter.put("/update:id", verifyUser, checkRole(["admin", "super admin"]), updateAssignedAsset)

// assignedAssetRouter.post("/return", verifyUser, checkRole["admin", "super admin"])


export default assignedAssetRouter;