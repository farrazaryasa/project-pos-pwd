import axios from "axios"
const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : null

export function getAllOrders() {
    return axios.get(
        process.env.REACT_APP_API + `/orders`,
        {
            headers: {
                Authorization: `bearer ${userLogin?.token}`
            }
        }
    )
}

export function addToCart(product) {
    return axios.post(
        process.env.REACT_APP_API + `/orders/new`,
        {
            product_id: product.id
        },
        {
            headers: {
                Authorization: `bearer ${userLogin?.token}`
            }
        }
    )
}

export function confirmOrder() {
    return axios.post(
        process.env.REACT_APP_API + `/orders/confirm`,
        {
            login: userLogin.id
        },
        {
            headers: {
                Authorization: `bearer ${userLogin?.token}`
            }
        }
    )
}

export function removeOrder() {
    return axios.delete(
        process.env.REACT_APP_API + `/orders/${userLogin.id}`,
        {
            headers: {
                Authorization: `bearer ${userLogin.token}`
            }
        }
    )
}