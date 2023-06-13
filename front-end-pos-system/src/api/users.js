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

export function postRegister(data) {
    return axios.post('http://localhost:3456/Register', {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      birthdate: data.birthdate,
    });
  }

export function userLogout(data){
    return axios.post(
        process.env.REACT_APP_API + `/auth/logout`,
        {
            id : data.id
        }
    )
}

