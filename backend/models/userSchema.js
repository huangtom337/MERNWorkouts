const mongoose = require('mongoose')
const bcrpyt = require('bcryptjs')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

//static login method

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email }).exec()

    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if (!user) {
        throw Error('incorrect email')
    }

    const match = await bcrpyt.compare(password, user.password)
    
    if (!match) {
        throw Error('incorrect password')
    }

    return user
    
}

//static signup method
userSchema.statics.signup = async function(email, password) {
    const exists = await this.findOne({ email }).exec()

    //validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Not a valid email')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password needs to be stronger')
    }

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrpyt.genSalt(10)
    const hashed = await bcrpyt.hash(password, salt)

    const user = await this.create({ email: email, password: hashed})

    return user

}

module.exports = mongoose.model('user', userSchema)
