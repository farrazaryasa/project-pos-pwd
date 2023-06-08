const db = require('./../models')
const products = db.products
const categories = db.categories


const getAllProducts = async (req, res) => {
    try {
        const { page } = req.query

        const paginationLimit = 10
        const paginationOffset = (Number(page) - 1) * paginationLimit

        const totalProducts = await products.findAll()

        const result = await products.findAll(
            {
                offset: paginationOffset,
                limit: paginationLimit,
                include: categories
            }
        )

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

const addProducts = async (req, res) => {
    try {
        const { name, price, stock } = req.body
        const image = req.file

        if (!name || !price || !stock || !image) {
            res.status(400).send({
                success: false,
                message: 'fill all the fields',
                data: null
            })
        } else {
            const postProduct = await products.create({
                name: name,
                price: price,
                stock: stock,
                image: image?.filename
            })

            if (postProduct) {
                res.status(200).send({
                    success: true,
                    message: 'Create new product success',
                    data: postProduct
                })
            } else {
                res.status(400).send({
                    success: false,
                    message: 'failed to create new product',
                    data: null
                })
            }
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

const modifyProducts = async (req, res) => {
    try {
        const { name, price, stock } = req.body
        const image = req.file
        const { id } = req.params
        // let token = req.headers.authorization
        // token = token.split(" ")[1]
        // const userToken = jwt.verify(token, 'secretKey')

        const findProduct = await products.findOne({
            where: {
                id: id
            }
        })

        if (findProduct) {
            if (name) {
                const result = await products.update(
                    { name: name },
                    { where: { id: findProduct.id } }
                )
            }
            if (price) {
                const result = await products.update(
                    { price: price },
                    { where: { id: findProduct.id } }
                )
            }
            if (stock) {
                const result = await products.update(
                    { stock: stock },
                    { where: { id: findProduct.id } }
                )
            }
            if (image) {
                const result = await products.update(
                    { image: image?.filename },
                    { where: { id: findProduct.id } }
                )
            }

            res.status(200).send({
                success: true,
                message: 'modify product success',
                data: {}
            })
        } else {
            res.status(404).send({
                success: false,
                message: 'products not found',
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

const filterProducts = async (req, res) => {
    try {
        const { category } = req.query
        const catQuery = category.replaceAll('%', ' ')

        const findCategory = await categories.findOne({
            where: {
                name: catQuery
            }
        })

        if (findCategory) {
            const result = await products.findAll({
                where: {
                    category_id: findCategory.id
                }
            })

            res.status(200).send({
                success: true,
                message: `get all products in ${category} categories success`,
                data: result
            })
        } else {
            res.status(404).send({
                success: false,
                message: 'no products found',
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
    addProducts,
    deleteProducts,
    modifyProducts,
    filterProducts
}

