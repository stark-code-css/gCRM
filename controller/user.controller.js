const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const response = new User({name, email, password})
        await response.save()
        return res.status(200).json({
            success: true,
            data: response
        })
    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            success: false,
            data: err
        })
    }
}

const login = async (req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
                return res.status(400).json({
                success: false,
                data: 'User not found'
            })
        }

        const passwordMatched = await user.compare(password);
        if(!passwordMatched){
            return res.status(400).json({
                success: false,
                data: 'Password not matched'
            })
        }
        else{
            return res.status(200).json({
                success: true,
                data: {
                    email: user.email,
                    token: jwt.sign(
                        { email: user.email }, 
                        process.env.JWT_SECRET,
                        { expiresIn: '7d' }
                    )
                }
            })
        }
    }
    catch(e){
        console.log(e)
        return res.status(400).json({
            success: false,
            data: e
        })
    }
}

module.exports = { register, login }