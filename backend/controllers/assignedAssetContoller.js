import AssetItem from "../models/AssetItem.js"
import AssignedAsset from "../models/AssignedAsset.js"
import User from "../models/User.js"

export const addAssignedAsset = async (req, res) => {
    try {
        if (req.body) {
            let assignedBy = req.user._id //admin/superadmin id
            const { assignedTo, assetItem } = req.body
            if (assignedTo && assetItem) { //check required
                let isItem = await AssetItem.findById(assetItem) //find the asset Item
                if (isItem && isItem.status == "available") {
                    let isUser = await User.findById(assignedTo) // find the user
                    if (isUser && isUser.status == "active") {
                        const assignedAsset = new AssignedAsset({ ...req.body, assignedBy }) //make instance
                        await assignedAsset.save() // create assigned asset
                        isItem.status = "assigned"
                        await isItem.save() // update the asset item
                        return res.status(201).send({ message: "Asset Assigned to the user successfully" })
                    } else {
                        return res.status(400).send({ error: "User is Not Valid or Inacitve" })
                    }
                } else {
                    return res.status(400).send({ error: "Asset Is not presents or available" })
                }
            } else {
                return res.status(400).send({ error: "Provide Require Fileds" })
            }
        } else {
            return res.status(400).send({ error: "Body can not be empty" })
        }
    } catch (error) {
        res.status(500).send({ error: "Something went wrong" })
    }
}

export const getAllAssinedAssets = async (req, res) => {
    try {
        const allAssinedAssets = await AssignedAsset.find()
            .populate("assignedTo")
            .populate("assetItem")
            .populate("assignedBy")
            .populate({
                path: "assetItem",
                populate: {
                    path: "model",
                    model: "AssetModel" // <-- your referenced collection name
                }
            })
        return res.status(200).send(allAssinedAssets)
    } catch (error) {
        res.status(500).send({ error: "Something went wrong", message: error.message })
    }
}

export const getMyAssinedAssets = async (req, res) => {
    try {
        const id = req.user._id //auth user's id
        const myAssets = await AssignedAsset.find({ assignedTo: id })
            .populate("assetItem")
            .populate("assignedBy")
            .populate({
                path: "assetItem",
                populate: {
                    path: "model",
                    model: "AssetModel"
                }
            })
        return res.status(200).send(myAssets)
    } catch (error) {
        res.status(500).send({ error: "Something went wrong", message: error.message })
    }
}

