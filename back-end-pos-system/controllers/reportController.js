const { Op, Sequelize } = require('sequelize')
const db = require('./../models')
const orders = db.orders
const products = db.products
const product_orders = db.product_orders
const transactions = db.transactions
const users = db.users
const sequelize = db.sequelize
const jwt = require('jsonwebtoken')

const chartData = async (req, res) => {
    try {
        const getData = await transactions.findAll({
            attributes: [
                /* add other attributes you may need from your table */
                [sequelize.fn('DATE', sequelize.col('createdAt')), 'Date'],
                [sequelize.fn('SUM', sequelize.col('total_transaction')), 'total_transaction']
            ],
            group: [sequelize.fn('DATE', sequelize.col('createdAt')), 'Date']
        })

        if (getData) {
            res.status(200).send({
                success: true,
                message: 'get chart data success',
                data: getData
            })
        } else {
            res.status(404).send({
                success: false,
                message: 'no data found',
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

const productSales = async (req, res) => {
    try {
        const getSales = await product_orders.findAll({
            include: [products, orders]
        })

        if (getSales) {
            res.status(200).send({
                success: true,
                message: 'get all transactions data success',
                data: getSales
            })
        } else {
            res.status(404).send({
                success: false,
                message: 'no transactions found',
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
    chartData,
    productSales
}
