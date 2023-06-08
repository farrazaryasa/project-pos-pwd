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

module.exports = {
    createCategory
}
