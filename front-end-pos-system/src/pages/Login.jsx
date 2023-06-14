import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { postLogin } from '../api/users';
import { Label, TextInput, Checkbox, Button } from 'flowbite-react'

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  //remove query from URL
  useEffect(() => {
    const { pathname } = location;
    window.history.replaceState({}, document.title, pathname);
  }, [location]);

  const handleEmailChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault(); //prevent form submission

    try {
      const requestBody = {
        id,
        password,
      };

      const response = await postLogin(requestBody);
      console.log(response.data)
      if (response.data.success) {
        alert('Login berhasil')
        // console.log(response.data)
        const payload = {
          id: response.data.userData.id,
          first_name: response.data.userData.first_name,
          last_name: response.data.userData.last_name,
          is_admin: response.data.userData.is_admin,
          token: response.data.token,
        }
        // console.log(payoald)
        localStorage.setItem('loginDetails', JSON.stringify(payload))

        if (response.data.userData.is_admin === true) {
          navigate('/products')
          window.location.reload()
        } else {
          navigate('/order')
          window.location.reload()
        }
      } else {
        const { message } = response.data;
        alert(message);
      }
    } catch (error) {
      console.error('error blok:', error);
      alert('Error ketika melakukan login');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-1">
      <div className="login w-600px mx-8 my-16 text-base">
        <div className="login-triangle border-transparent border-t-12 border-b-0 mx-auto w-0" />
        <h2 className="login-header bg-blue-500 py-6 text-xl font-medium text-white text-center uppercase">
          Log in
        </h2>
        <form className="login-container bg-gray-200 p-6 flex flex-col gap-2" onSubmit={handleLoginFormSubmit}>
          <p>
            <input
              type="text"
              placeholder="Employee ID"
              className="input-field w-full bg-white border border-gray-300 py-4 px-6"
              onChange={handleEmailChange}
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="Password"
              className="input-field w-full bg-white border border-gray-300 py-4 px-6"
              onChange={handlePasswordChange}
            />
          </p>
          <p>
            <button
              type="submit"
              className="login-btn bg-blue-500 border border-transparent text-white py-4 px-6 cursor-pointer hover:bg-blue-400 focus:border-blue-600"
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>

  )
}

export default Login