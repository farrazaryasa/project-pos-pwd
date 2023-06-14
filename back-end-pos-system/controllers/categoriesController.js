const db = require('./../models')
const categories = db.categories


const createCategory = async (req, res) => {
    try {
        const { category } = req.body

        const result = await categories.create({
            name: category
        })

        if (result) {
            res.status(200).send({
                success: true,
                message: 'create new category success',
                data: result
            })
        } else {
            res.status(400).send({
                success: false,
                message: 'create new category failed',
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

const getAllCategories = async (req, res) => {
    try {
        const result = await categories.findAll()
        if (result) {
            res.status(200).send({
                success: true,
                message: 'get all categories success',
                data: result
            })
        } else {
            res.status(404).send({
                success: false,
                message: 'no categories found',
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

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        const findCategory = await categories.findOne({
            where: {
                id: id
            }
        })

        if (findCategory) {
            const removeCategory = await categories.destroy({
                where: {
                    id: findCategory.id
                }
            })

            if (removeCategory) {
                res.status(200).send({
                    success: true,
                    message: 'category deleted',
                    data: null
                })
            }
        } else {
            res.status(404).send({
                success: false,
                message: 'categories not found',
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
    createCategory,
    getAllCategories,
    deleteCategory
}
