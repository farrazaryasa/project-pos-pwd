const db = require('./../models')
const orders = db.orders
const products = db.products
const product_orders = db.product_orders
const transactions = db.transactions
const users = db.users
const sequelize = db.sequelize

const getAllUser = async (req, res) => {
    try {
        const result = await users.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email',
                [sequelize.fn('DATE', sequelize.col('birthdate')), 'birthdate'],
                'role']
        })

        if (result) {
            res.status(200).send({
                success: true,
                message: 'get all employee data success',
                data: result
            })
        } else {
            res.status(404).send({
                success: false,
                message: 'no employees found',
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
    getAllUser
}
