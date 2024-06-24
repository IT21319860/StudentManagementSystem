const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema
const studentSchema = new Schema ({
    mail:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

//static signup method
studentSchema.statics.signup = async function(mail, password){

    //validation
    if (!mail || !password){
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(mail)){
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong')
    }



    const exists = await this.findOne({mail})

    if(exists){
        throw Error('Email already in use')
    }


    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const student = await this.create({ mail, password:hash })

    return student
}

//static login method
studentSchema.statics.login = async function(mail,password){

    //validation
    if (!mail || !password){
        throw Error('All fields must be filled')
    }

    const student = await this.findOne({mail})

    if(!student){
        throw Error('Incorrect Email!')
    }
    const match = await bcrypt.compare(password, student.password)

    if(!match){
        throw Error('Incorrect password')
    }

    return student
}

module.exports = mongoose.model('Student',studentSchema)