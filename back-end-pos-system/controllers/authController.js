const jwt = require('jsonwebtoken')
const db = require('../models')
const users = db.users

module.exports = {
  login: async (req, res) => {

    try {
      const { id, password } = req.body

      if (!id) {
        return res.status(400).send({
          success: false,
          message: 'Field ID harus diisi'
        })
      }

      const findUser = await users.findOne({ where: { id: id } })

      if (!findUser) {
        return res.status(401).send({
          success: false,
          message: 'ID atau password tidak valid'
        })

      } else {
        //jika email dan password valid buat token JWT
        const token = jwt.sign({ id }, 'secretKey')

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
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
}
