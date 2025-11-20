import express from "express";
import cors from "cors"
import { dbConnect } from "./configs/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import createSuperAdmin from "./configs/createSuperAdmin.js";
import assetModelRouter from "./routes/assetModelRoutes.js";
import assetItemRouter from "./routes/assetItemRoutes.js";
import assignedAssetRouter from "./routes/assignedAssetRoutes.js";

const app = express()

//middlewares
app.use(express.json()) //json parser
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})) //cross origin allow
app.use(cookieParser()) //cookies parser

//routes
app.get("/", (req, res) => res.send({ message: "Server at Work" }))//demo

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/asset-model", assetModelRouter)
app.use("/api/v1/asset-item", assetItemRouter)
app.use("/api/v1/assigned-asset", assignedAssetRouter)



app.listen(8080, async () => {
    console.log("server running at http://localhost:8080")
    //db connection
    await dbConnect()
    //super admin
    await createSuperAdmin()
})