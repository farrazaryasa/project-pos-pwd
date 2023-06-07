import axios from "axios"
const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : null
console.log(userLogin);
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
        process.env.REACT_APP_API + `/products/${Number(product_id)}`,
        {
            headers : {
                Authorization : `bearer ${userLogin?.token}`
            }
        }
    )
}

export function createProducts(data) {
    return axios.post(
        process.env.REACT_APP_API + `/products/new`,
        {
            name: data.name,
            price: data.price,
            stock: data.stock,
            image: data.image
        },
        {
            headers: {
                Authorization : `Bearer ${userLogin?.token}`,
                "Content-Type": "multipart/form-data"
            }
        }
    )
}

export function modifyProducts(data) {
    return axios.put(
        process.env.REACT_APP_API + `/products/${Number(data.id)}`,
        {
            name: data.name,
            price: data.price,
            stock: data.stock,
            image: data.image
        },
        {
            headers: {
                Authorization : `Bearer ${userLogin?.token}`,
                "Content-Type": "multipart/form-data"
            }
        }
    )
}
