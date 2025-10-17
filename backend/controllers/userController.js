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


export async function getAllEmployees(req, res) {
    try {
        const employees = await User.find({ role: "employee" }).select("-password -updatedAt -createdAt -__v")
        return res.status(200).send(employees)
    } catch (error) {
        return res.status(500).send({
            message: "Something went worng",
            error: error.message
        })
    }
}

export async function getAllAdmins(req, res) {
    try {
        const admins = await User.find({ role: "admin" }).select("-password -updatedAt -createdAt -__v")
        return res.status(200).send(admins)
    } catch (error) {
        return res.status(500).send({
            message: "Something went worng",
            error: error.message
        })
    }
}

export async function editEmployee(req, res) {
    try {
        const { empid } = req.headers
        console.log(req.headers)
        if (empid) {
            let employee = await User.findById(empid)
            if (employee) {
                await User.findByIdAndUpdate(empid, { $set: { ...req.body } })
                return res.status(200).send({ message: "Employee Details Updated" })
            } else {
                return res.status(400).send({ error: "User is not exists" })
            }
        } else {
            return res.status(400).send({ error: "Provide Employee Id" })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Something went worng",
            error: error.message
        })
    }
}


export async function editAdmin(req, res) {
    try {
        const { adminid } = req.headers
        console.log(req.headers)
        if (adminid) {
            let admin = await User.findById(adminid)
            if (admin) {
                await User.findByIdAndUpdate(adminid, { $set: { ...req.body } })
                return res.status(200).send({ message: "Admin Details Updated" })
            } else {
                return res.status(400).send({ error: "User is not exists" })
            }
        } else {
            return res.status(400).send({ error: "Provide Admin Id" })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Something went worng",
            error: error.message
        })
    }
}


export async function deleteUser(req, res) {
    try {
        const { userid } = req.headers
        if (userid) {
            let user = await User.findById(userid)
            if (user) {
                await User.findByIdAndDelete(userid)
                return res.status(200).send({ message: "User Data Deleted Successfully" })
            } else {
                return res.status(400).send({ error: "User is not exists" })
            }
        } else {
            return res.status(400).send({ error: "Provide User Id" })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Something went worng",
            error: error.message
        })
    }
}