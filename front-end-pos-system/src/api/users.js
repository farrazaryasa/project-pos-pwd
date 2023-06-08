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

export function postRegister(data) {
    return axios.post('http://localhost:3456/Register', {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      birthdate: data.birthdate,
    });
  }