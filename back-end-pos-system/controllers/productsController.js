const db = require('./../models')
const products = db.products
const categories = db.categories

const getAllProducts = async (req, res) => {
  try {
    const { page, category, sort } = req.query;

    const paginationLimit = 10;
    const paginationOffset = (Number(page) - 1) * paginationLimit;

    if (category) {
      const catQuery = category.replaceAll('%', ' ');

      const findCategory = await categories.findOne({
        where: {
          name: catQuery,
        },
      });

      if (findCategory) {
        const result = await products.findAndCountAll({
          where: {
            category_id: findCategory.id,
          },
          offset: paginationOffset,
          limit: paginationLimit,
          include: { model: categories }, 
        });

        const totalPage = Math.ceil(result.count / paginationLimit);

        res.status(200).send({
          success: true,
          message: `get all products in ${catQuery} categories success`,
          data: result,
          totalPage: totalPage,
        });
      } else {
        res.status(404).send({
          success: false,
          message: 'no products found',
          data: null,
        });
      }
    } else {
      let order = [];

      if (sort) {
        if (sort === 'name-asc') {
          order = [['name', 'ASC']];
        } else if (sort === 'name-desc') {
          order = [['name', 'DESC']];
        } else if (sort === 'price-asc') {
          order = [['price', 'ASC']];
        } else if (sort === 'price-desc') {
          order = [['price', 'DESC']];
        }
      }

      const result = await products.findAndCountAll({
        where: {},
        offset: paginationOffset,
        limit: paginationLimit,
        include: { model: categories }, 
        order: order,
      });

      const totalPage = Math.ceil(result.count / paginationLimit);

      if (result) {
        res.status(200).send({
          success: true,
          message: 'get all data success',
          data: result,
          totalPage: totalPage,
        });
      } else {
        res.status(200).send({
          success: false,
          message: 'get all data failed',
          data: {}
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
        const { name, price, stock, category } = req.body
        const image = req.file

        if (!name || !price || !stock || !image || !category) {
            res.status(400).send({
                success: false,
                message: 'fill all the fields',
                data: null
            })
        } else {
            const findCategory = await categories.findOne({
                where: {
                    name: category
                }
            })

            if (findCategory) {
                const postProduct = await products.create({
                    name: name,
                    price: price,
                    stock: stock,
                    image: image?.filename,
                    category_id: findCategory.id
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
            } else {
                res.status(400).send({
                    success: false,
                    message: 'Category not found',
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
            console.log('id => ', findProduct.id);

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
// const sortProducts = async (req, res) => {
//     try {
//         const { sort } = req.query

//         let order;

//         switch (sort) {
//             case 'name-asc':
//                 order = [['name', 'ASC']]
//                 break;
//             case 'name-desc':
//                 order = [['name', 'DESC']]
//                 break;
//             case 'price-asc':
//                 order = [['price', 'ASC']]
//                 break;
//             case 'price-desc':
//                 order = [['price', 'DESC']]
//                 break;
//             default:
//                 break;
//         }

//         const sortedProducts = await products.findAll({
//             order: order,
//         })

//         if (sortedProducts.length > 0) {
//             return res.status(200).send({
//                 success: true,
//                 message: 'get sorted data success',
//                 data: sortedProducts,
//             })
//         } else {
//             return res.status(200).send({
//                 success: false,
//                 message: 'no sorted data found',
//                 data: [],
//             })
//         }
//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             message: error.message,
//             data: null,
//         })
//     }
// }

module.exports = {
    getAllProducts,
    getProductDetails,
    addProducts,
    deleteProducts,
    modifyProducts

}

