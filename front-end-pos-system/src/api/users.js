import axios from "axios"


export function postLogin(data) {
    return axios.post(
        `http://localhost:3456/Login`,
        {
            id : data.id,
            password : data.password
        }
    )
}