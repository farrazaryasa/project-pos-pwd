const db = require('./../models')
const products = db.products


const getAllProducts = async (req, res) => {
    try {
        const result = await products.findAll()

        if (result) {
            return res.status(200).send({
                success: true,
                message: "get all data success",
                data: result
            })
        } else {
            return res.status(200).send({
                success: false,
                message: "get all data failed",
                data: {}
            })
        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        })
    }
}

const getProductDetails = async (req, res) => {
    try {
        const { product_id } = req.params

        const result = await products.findOne({
            id: product_id
        })

        if (result) {
            res.status(200).send({
                success: true,
                message: 'get product detail success',
                data: result
            })
        } else {
            res.status(404).send({
                success: false,
                message: 'no product found',
                data: null
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        })
    }
}


module.exports = {
    getAllProducts,
    getProductDetails
}

