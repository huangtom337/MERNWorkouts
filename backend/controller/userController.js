const userModel = require('../models/userSchema')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d' })
}

const user_login = async(req, res) => {
    const {email, password} = req.body

    userModel.login(email, password)
        .then(result => {
            const token = createToken(result._id)
            res.status(200).json({email, token})
        })
        .catch(err => {
            res.status(400).json({error: err.message})
        })
}

const user_signup = async(req, res) => {
    const {email, password} = req.body
    
    // try {
    //     const user = await userModel.signup(email, password)

    //     res.status(200).json({email, user})
    // } catch (err) {
    //     res.status(400).json({error: err.message})
    // }


    userModel.signup(email, password)
        .then(result => {
            const token = createToken(result._id)
            res.status(200).json({email, token})
        })
        .catch(err => 
            res.status(400).json({error: err.message})    
        )
    
  
}

module.exports = { user_login, user_signup }
