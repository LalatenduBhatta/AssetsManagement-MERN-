import AssetModel from "../models/AssetModel.js"

export const addAssetModel = async (req, res) => {
    try {
        if (req.body) {
            let isExists = await AssetModel.findOne({ name: req.body.name })
            if (!isExists) {
                await AssetModel.create(req.body)
                return res.status(200).send({ message: "AssetModel Created" })
            } else {
                return res.status(400).send({ error: "AssetModel Already Exists" })
            }
        } else {
            return res.status(400).send({ error: "Body Can not be empty" })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Something went worng",
            error: error.message
        })
    }
}