import AssetItem from "../models/AssetItem.js"
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

export const editAssetModel = async (req, res) => {
    try {
        if (req.body) {
            let { id } = req.params //get the id from req params
            let response = await AssetModel.findByIdAndUpdate(id, { $set: { ...req.body } })
            if (response)
                return res.status(200).send({ message: "Asset Model Updated" })
            else
                return res.status(400).send({ error: "Asset Model Not Found" })
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


export const deleteAssetModel = async (req, res) => {
    try {
        let { id } = req.query
        let isModel = await AssetModel.findById(id)
        if (isModel) {
            let isItems = await AssetItem.findOne({ model: id })
            if (isItems) {
                res.status(400).send({ error: "Can not delete the model used for items" })
            }
            else {
                await AssetModel.findByIdAndDelete(id)
                return res.status(200).send({ message: "Asset Model is Deleted" })
            }
        }
        else
            return res.status(400).send({ error: "Asset Model Not Found" })
    } catch (error) {
        return res.status(500).send({
            message: "Something went worng",
            error: error.message
        })
    }
}


export const getAssetModels = async (req, res) => {
    try {
        const response = await AssetModel.find()
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({
            message: "Something went worng",
            error: error.message
        })
    }
}


export const getAssetModelsWithItems = async (req, res) => {
    try {
        let allModelsWithItems = await AssetModel.aggregate([{
            $lookup: {
                localField: "_id",
                from: "assetitems",
                foreignField: "model",
                as: "items",
            }
        }])
        res.status(200).send(allModelsWithItems)
    } catch (error) {
        return res.status(500).send({
            message: "Something went worng",
            error: error.message
        })
    }
}