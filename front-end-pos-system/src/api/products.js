import axios from "axios"

export function getAllProducts() {
    return axios.get(
        "http://localhost:3456/product"
    )
}

