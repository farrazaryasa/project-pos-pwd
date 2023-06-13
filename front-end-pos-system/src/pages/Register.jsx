import { useState } from "react";
import { postRegister } from '../api/users';

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    birthdate: "",
  })

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      postRegister(formData)
        .then(response => {
          console.log("Registration successful:", response.data);
          alert('Registrasi berhasil');
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.message) {
            console.error('Registration failed:', error.response.data.message);
            alert('Registrasi failed')
          } else {
            console.error('Registration failed:', error);
          }
        });
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.first_name) {
      errors.first_name = "First name is required";
    }

    if (!data.last_name) {
      errors.last_name = "Last name is required";
    }

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email address";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!data.birthdate) {
      errors.birthdate = "Birthdate is required";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    //regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            className="border border-gray-300 px-4 py-2 rounded-md mb-4"
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
          {errors.first_name && (
            <div className="text-red-500 mb-2">{errors.first_name}</div>
          )}

          <input
            className="border border-gray-300 px-4 py-2 rounded-md mb-4"
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
          {errors.last_name && (
            <div className="text-red-500 mb-2">{errors.last_name}</div>
          )}

          <input
            className="border border-gray-300 px-4 py-2 rounded-md mb-4"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <div className="text-red-500 mb-2">{errors.email}</div>
          )}

          <input
            className="border border-gray-300 px-4 py-2 rounded-md mb-4"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <div className="text-red-500 mb-2">{errors.password}</div>
          )}

          <input
            className="border border-gray-300 px-4 py-2 rounded-md mb-4"
            type="date"
            name="birthdate"
            placeholder="Birthdate"
            value={formData.birthdate}
            onChange={handleInputChange}
          />
          {errors.birthdate && (
            <div className="text-red-500 mb-2">{errors.birthdate}</div>
          )}

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
