import axios from "axios"
const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : null

export function getAllCategories() {
    return axios.get(
        process.env.REACT_APP_API + '/categories'
    )
}