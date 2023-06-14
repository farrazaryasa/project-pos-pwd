import axios from "axios"


export function getStaff() {
    return axios.get(
        process.env.REACT_APP_API + '/staff'
    )
}