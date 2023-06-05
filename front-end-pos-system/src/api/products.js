import axios from "axios"

export function getAllProducts() {
    return axios.get(
        "http://localhost:3456/product"
    )
}

export function getProductDetails(product_id) {
    return axios.get(
        `http://localhost:3456/product/${Number(product_id)}`
    )
}
