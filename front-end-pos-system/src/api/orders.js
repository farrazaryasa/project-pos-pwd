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

export function addToCart() {
    return axios.post(
        process.env.REACT_APP_API + `/orders/new`,
        {
            headers: {
                Authorization: `bearer ${userLogin?.token}`
            }
        }
    )
}