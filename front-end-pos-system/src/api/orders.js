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