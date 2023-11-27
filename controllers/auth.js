const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const register = (req, res) => {
    const user = User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Invalid credentials')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    const isPasswordCorrect = await user.checkPassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
    register,
    login
}