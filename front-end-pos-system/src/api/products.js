import axios from "axios"

export function getAllProducts(page) {
    return axios.get(
        `http://localhost:3456/products?page=${Number(page)}`
    )
}

export function getProductDetails(product_id) {
    return axios.get(
        `http://localhost:3456/products/${Number(product_id)}`
    )
}

export function deleteProduct(product_id) {
    return axios.delete(
        `http://localhost:3456/products/${Number(product_id)}`
    )
}
