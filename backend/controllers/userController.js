import User from "../models/User.js"
import { comparePassword, createHash } from "../utils/bcrypt.js"

export async function addUser(req, res) {
    try {
        //body data
        const { name, email, mobile } = req.body
        if (name && email && mobile) {
            const isUser = await User.findOne({ email })
            if (isUser) {
                return res.status(400).send({ message: "User Already Exists" })
            } else {
                //add
                const hashedPassword = createHash("mypassword@#$!")
                const userDetails = new User({ ...req.body, password: hashedPassword })
                await userDetails.save()
                return res.status(201).send({ message: "User Created" })
            }
        } else {
            return res.status(400).send({ message: "Provide All required Fields" })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Something went worng",
            error: error.message
        })
    }
}


export async function updateUser(req, res) {
    try {
        const user = req.user //coming from verifyUser middleware
        if (!req.body) {
            return res.status(400).send({ message: "No Data Provided" })
        } else {
            const { mobile, name } = req.body
            user.name = name ? name : user.name
            user.mobile = mobile ? mobile : user.mobile
            await user.save()
            return res.status(200).send({ message: "User Data Updated" })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Something went worng",
            error: error.message
        })
    }
}

export async function changePass(req, res) {
    try {
        const { user } = req  //coming from verifyUser middleware
        if (!req.body) {
            return res.status(400).send({ message: "No Data Provided" })
        } else {
            const { currentPassword, newPassword } = req.body
            if (currentPassword && newPassword) {
                const isMatched = comparePassword(currentPassword, user.password)
                if (isMatched) {
                    //hash the new pass
                    const hashedPassword = createHash(newPassword)
                    user.password = hashedPassword //update the user password
                    await user.save()
                    return res.status(200).send({ message: "Password Updated Successfully" })
                } else {
                    return res.status(400).send({ message: "Incorrect Password" })
                }
            } else {
                return res.status(400).send({ message: "Provide All the fields" })
            }
        }
    } catch (error) {
        return res.status(500).send({
            message: "Something went worng",
            error: error.message
        })
    }
}

