const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')

const register = (req, res) => {
    const user = User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = (req, res) => {
    res.json({ msg: 'login'})
}

module.exports = {
    register,
    login
}