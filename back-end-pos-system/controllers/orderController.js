const { Op } = require('sequelize')
const db = require('./../models')
const orders = db.orders
const products = db.products
const product_orders = db.product_orders
const transactions = db.transactions
const users = db.users
const jwt = require('jsonwebtoken')

const addCart = async (req, res) => {
    try {
        const { product_id } = req.body
        let token = req.headers.authorization
        token = token.split(" ")[1]
        const userToken = jwt.verify(token, 'secretKey')

        if (userToken) {
            const findOrder = await orders.findOne({
                where: {
                    user_id: userToken.id,
                    is_paid: false
                }
            })

            const findProduct = await products.findOne({
                where: {
                    id: product_id
                }
            })


            if (findOrder) {

                const findProductOrder = await product_orders.findOne({
                    where: {
                        product_id: findProduct.id,
                        order_id: findOrder.id
                    }
                })

                if (findProductOrder) {
                    if (findProduct.stock <= 0) {
                        res.status(400).send({
                            success: false,
                            message: 'product have no stock',
                            data: null
                        })

                    } else {
                        const updateQuantity = await product_orders.update(
                            {
                                quantity: findProductOrder.quantity + 1,
                                total: (findProductOrder.quantity + 1) * findProductOrder.price
                            },
                            {
                                where: {
                                    order_id: findOrder.id,
                                    product_id: findProduct.id
                                }
                            }
                        )

                        const updateStock = await products.update(
                            { stock: findProduct.stock - 1 },
                            {
                                where: {
                                    id: findProduct.id
                                }
                            }
                        )

                        if (updateQuantity && updateStock) {
                            res.status(200).send({
                                success: true,
                                message: 'update quantity success',
                                data: { quantity: findProductOrder.quantity + 1 }
                            })
                        } else {
                            res.status(400).send({
                                success: true,
                                message: 'update quantity failed',
                                message: null
                            })
                        }
                    }
                } else {
                    const addProductOrder = await product_orders.create(
                        {
                            order_id: findOrder.id,
                            product_id: findProduct.id,
                            quantity: 1,
                            price: findProduct.price,
                            total: findProduct.price
                        }
                    )

                    if (addProductOrder) {
                        res.status(200).send({
                            success: true,
                            message: `add new product to order success`,
                            data: addProductOrder
                        })
                    }
                }
            } else {
                if (findProduct) {
                    if (findProduct.stock <= 0) {
                        res.status(400).send({
                            success: false,
                            message: 'product have no stock',
                            data: null
                        })

                    } else {
                        const addOrder = await orders.create(
                            {
                                user_id: userToken.id,
                                is_paid: false
                            }
                        )

                        if (addOrder) {
                            const addProductOrder = await product_orders.create({
                                order_id: addOrder.id,
                                product_id: findProduct.id,
                                quantity: 1,
                                price: findProduct.price,
                                total: findProduct.price
                            })

                            const updateStock = await products.update(
                                { stock: findProduct.stock - 1 },
                                {
                                    where: {
                                        id: findProduct.id
                                    }
                                }
                            )

                            res.status(200).send({
                                success: true,
                                message: 'success create new order',
                                data: addProductOrder
                            })
                        }
                    }
                } else {
                    res.status(404).send({
                        success: false,
                        message: 'no products found',
                        data: null
                    })
                }
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

const decreaseProductCart = async (req, res) => {
    try {
        const { product_id } = req.body
        let token = req.headers.authorization
        token = token.split(" ")[1]
        const userToken = jwt.verify(token, 'secretKey')

        const findOrder = await orders.findOne({
            where: {
                user_id: userToken.id,
                is_paid: false
            }
        })

        const findProduct = await products.findOne({
            where: {
                id: product_id
            }
        })

        if (findOrder && findProduct) {
            const findProductOrder = await product_orders.findOne({
                where: {
                    order_id: findOrder.id,
                    product_id: findProduct.id
                }
            })

            if (findProductOrder.quantity === 1) {
                const deleteOrder = await product_orders.destroy({
                    where: {
                        id: findProductOrder.id
                    }
                })

                const updateStock = await products.update(
                    { stock: findProduct.stock + 1 },
                    { where: { id: findProduct.id } }
                )

                res.status(200).send({
                    success: true,
                    message: 'product deleted from order',
                    data: {}
                })
            } else {
                const decreaseQuantity = await findProductOrder.update(
                    { quantity: findProductOrder.quantity - 1 },
                    { where: { id: findProductOrder.id } }
                )

                const updateStock = await products.update(
                    { stock: findProduct.stock + 1 },
                    { where: { id: findProduct.id } }
                )

                res.status(200).send({
                    success: true,
                    message: 'product quantity reduced from order',
                    data: {}
                })
            }
        } else {
            res.status(404).send({
                success: false,
                message: 'order not found',
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

const userPaid = async (req, res) => {
    try {
        let token = req.headers.authorization
        token = token.split(" ")[1]
        const userToken = jwt.verify(token, 'secretKey')

        const findOrders = await orders.findOne(
            { where: { user_id: userToken.id, is_paid: false } }
        )

        if (findOrders) {
            const totalTransaction = await product_orders.sum('total', { where: { order_id: { [Op.eq]: findOrders.id } } })

            if (totalTransaction) {
                const createTransaction = await transactions.create({
                    order_id: findOrders.id,
                    total_transaction: totalTransaction
                })

                if (createTransaction) {
                    const updateStatus = await orders.update(
                        { is_paid: true },
                        {
                            where: {
                                id: findOrders.id
                            }
                        }
                    )
                    res.status(200).send({
                        success: true,
                        message: 'Transaction success',
                        data: createTransaction
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        message: 'Transaction Failed',
                        data: {}
                    })
                }
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

const getCart = async (req, res) => {
    try {
        let token = req.headers.authorization
        token = token.split(" ")[1]
        const userToken = jwt.verify(token, 'secretKey')

        const getAll = await product_orders.findAll({
            include: [
                {
                    model: orders,
                    where: {
                        user_id: userToken.id,
                        is_paid: false
                    }
                },
                {
                    model: products
                }
            ]
        })

        if (getAll) {
            res.status(200).send({
                success: true,
                message: 'get order data success',
                data: getAll
            })
        } else {
            res.status(404).send({
                success: false,
                message: 'no order found',
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

const removeCart = async (req, res) => {
    try {
        const user_id = req.params

        const findOrders = await orders.findOne({
            where: {
                user_id: user_id.id,
                is_paid: false
            }
        })

        if (findOrders) {
            const deleteProductOrder = await product_orders.destroy({
                where: {
                    order_id: findOrders.id
                }
            })

            const deleteOrder = await orders.destroy({
                where: {
                    id: findOrders.id
                }
            })

            if (deleteProductOrder && deleteOrder) {
                res.status(200).send({
                    success: true,
                    message: 'products remove from cart',
                    data: {}
                })
            } else {
                res.status(400).send({
                    success: false,
                    message: 'failed to remove products from cart',
                    data: null
                })
            }
        } else {
            res.status(404).send({
                success: false,
                message: 'no products found in cart',
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
    addCart,
    decreaseProductCart,
    userPaid,
    getCart,
    removeCart
}