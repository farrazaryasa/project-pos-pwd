const jwt = require('jsonwebtoken')
const db = require('../models')
const users = db.users

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, first_name, last_name, birthdate } = req.body;

      if (!email || !password || !first_name || !last_name || !birthdate) {
        return res.status(400).json({
          success: false,
          message: 'Data harus diisi'
        })
      }


      const findUser = await users.findOne({ where: { email: email } })
      console.log('Pengguna:', findUser)
      if (findUser) {
        return res.status(409).json({
          success: false,
          message: 'Pengguna sudah terdaftar'
        });

      }

      const newUser = await users.create({
        email,
        password,
        first_name,
        last_name,
        birthdate
      });

      res.status(201).json({
        success: true,
        message: 'Registrasi berhasil',
        userData: newUser
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat registrasi'
      });
    }
  },

  login: async (req, res) => {
    try {
      const { id, password } = req.body;

      if (!id) {
        return res.status(400).send({
          success: false,
          message: 'Field ID harus diisi'
        })
      }

      const findUser = await users.findOne({ where: { id: id, password: password } })

      if (!findUser) {
        return res.status(401).send({
          success: false,
          message: 'ID atau password tidak valid'
        })

      } else {
        //jika email dan password valid buat token JWT
        const token = jwt.sign(
          {
            id: id,
            is_admin: findUser.is_admin
          }, 'secretKey')

        const updateStatus = await users.update(
          { is_login: true },
          { where: { id: id } }
        )

        res.status(200).send(
          {
            success: true,
            message: 'Login berhasil',
            token,
            userData: {
              id: findUser.id,
              first_name: findUser.first_name,
              last_name: findUser.last_name,
              is_admin: findUser.is_admin
            }
          })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error.message,
        data: null

      })
    }
  },

  logout: async (req, res) => {
    try {
      const { id } = req.body

      const findUser = await users.findOne(
        { where: { id: id } }
      )

      if (findUser) {
        const updateLogout = await users.update(
          { is_login: false },
          { where: { id: findUser.id } }
        )

        res.status(200).send({
          success: true,
          message: 'logout success',
          data: {}
        })
      } else {
        res.status(400).send({
          success: false,
          message: 'logout failed',
          data: null
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error.message,
        data: null
      })
    }
  }
}
