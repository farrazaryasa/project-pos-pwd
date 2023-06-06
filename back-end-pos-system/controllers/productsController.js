const db = require('./../models')
const products = db.products


const getAllProducts = async (req, res) => {
    try {
        const { page } = req.query

        const paginationLimit = 10
        const paginationOffset = (Number(page) - 1) * paginationLimit

        const totalProducts = await products.findAll()

        const result = await products.findAll({
            offset: paginationOffset,
            limit: paginationLimit
        })

        const totalPage = Math.ceil(totalProducts.length / paginationLimit)

        if (result) {
            return res.status(200).send({
                success: true,
                message: "get all data success",
                data: result,
                totalPage: totalPage
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
            where: {
                id: product_id
            }
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

const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params

        const findProduct = await products.findOne({
            where: {
                id: id
            }
        })

        if (findProduct) {
            const deleteData = products.destroy({
                where: {
                    id: findProduct.id
                }
            })

            res.status(200).send({
                success: true,
                message: "delete data success",
                data: {}
            })
        } else {
            res.status(404).send({
                success: false,
                message: "no data found",
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
    getProductDetails,
    deleteProducts
}

