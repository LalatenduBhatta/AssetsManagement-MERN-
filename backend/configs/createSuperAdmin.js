import User from "../models/User.js";
import { createHash } from "../utils/bcrypt.js";

export default async function createSuperAdmin() {
    try {
        let isExists = await User.findOne({ role: "super admin" })
        if (!isExists) {
            const hashedPassword = createHash("superadmin@1234")
            const superAdmin = new User({
                name: "Vicky",
                email: "lalatendubhatta@gmail.com",
                password: hashedPassword,
                mobile: "9692658714",
                role: "super admin"
            })
            await superAdmin.save()
        }
    } catch (error) {
        console.log(error.message)
    }
}