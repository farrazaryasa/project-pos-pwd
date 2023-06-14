import axios from "axios"
const userLogin = localStorage.getItem("loginDetails") ? JSON.parse(localStorage?.getItem("loginDetails")) : null

export function getAllCategories() {
    return axios.get(
        process.env.REACT_APP_API + '/categories'
    )
}

export function addNewCategory(categoryName) {
    return axios.post(
        process.env.REACT_APP_API + '/categories',
        {
            category: categoryName
        }
    )
}

export function deleteCategory(id) {
    return axios.delete(
        process.env.REACT_APP_API + `/${id}`
    )
}