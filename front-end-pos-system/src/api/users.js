import axios from "axios"


export function postLogin(data) {
    return axios.post(
        process.env.REACT_APP_API + `/auth/login`,
        {
            id : data.id,
            password : data.password
        }
    )
}

export function userLogout(data){
    return axios.post(
        process.env.REACT_APP_API + `/auth/logout`,
        {
            id : data.id
        }
    )
}