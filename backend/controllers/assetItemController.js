import AssetItem from "../models/AssetItem.js"

export const addAssetItem = async (req, res) => {
    try {
        if (req.body) {
            let isExists = await AssetItem.findOne({ serialNumber: req.body.serialNumber })
            if (!isExists) {
                await AssetItem.create(req.body)
                return res.status(200).send({ message: "Asset Created" })
            } else {
                return res.status(400).send({ error: "Asset Already Exists" })
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