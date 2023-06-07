import axios from "axios"

export function getAllProducts(page) {
    return axios.get(
        process.env.REACT_APP_API + `/products?page=${Number(page)}`
    )
}

export function getProductDetails(product_id) {
    return axios.get(
        process.env.REACT_APP_API + `/products/${Number(product_id)}`
    )
}

export function deleteProduct(product_id) {
    return axios.delete(
        process.env.REACT_APP_API + `/products/${Number(product_id)}`
    )
}

export function createProducts(data){
    return axios.post(
        process.env.REACT_APP_API + `/products/new`,
        {
            name : data.name,
            price : data.price,
            stock : data.stock,
            image : data.image
        },
        {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        }
    )
}
