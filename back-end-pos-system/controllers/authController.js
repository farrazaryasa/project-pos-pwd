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
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email harus diisi'
        });
      }

      const findUser = await users.findOne({ where: { email: email } });
      console.log('Pengguna:', findUser)

      if (!findUser) {
        return res.status(401).json({
          success: false,
          message: 'Email tidak valid'
        });
      } else if (findUser.password !== password) {
        return res.status(401).json({
          success: false,
          message: 'ID atau Password tidak valid'
        });
      } else {
        // Jika email dan password valid, buat token JWT
        const token = jwt.sign({ id }, 'secretKey')

        res.status(200).send({
          success: true,
          message: 'Login berhasil',
          token,
          userData: {
            id: findUser.id,
            first_name: findUser.first_name,
            last_name: findUser.last_name,
            is_admin: findUser.is_admin
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat login'
      })
    }
  },
}
