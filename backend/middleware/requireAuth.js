const jwt = require('jsonwebtoken')
const userModel = require('../models/userSchema')

const requireAuth = async(req, res, next) => {
    
    //verify user
    const { authorization } = req.headers
    
    if (!authorization) {
        
        return res.status(401).json({error: 'authorization token required'})
    }

    const token = authorization.split(' ')[1]
    
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)

        // req.user = await userModel.findById(_id).select('_id')
        //we are attacthing a new field called user with an an object _id as content
        req.user = {_id}

        next()

    } catch (error) {
        console.log(error)
        
        res.status(401).json({error: 'request is not authorized'})
    }
    
}

module.exports = requireAuth