const Student = require('../models/studentModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}


//login student
const loginStudent = async(req, res) => {
    const {mail, password} = req.body

    try{
        const student = await Student.login(mail,password)

        //create a token
        const token = createToken(student._id)

        res.status(200).json({ mail, token})

    } catch(error){
        res.status(400).json({error:error.message})
    }

}




//signup student
const signupStudent = async(req, res) => {
    const{mail,password} = req.body
    
    try{
        const student = await Student.signup(mail,password)

        //create a token
        const token = createToken(student._id)

        res.status(200).json({ mail, token})

    } catch(error){
        res.status(400).json({error:error.message})
    }

    
}

module.exports = { signupStudent, loginStudent }