const User = require('../models/userModels')
const mongoose = require('mongoose')

//get all users
const getUsers = async(req,res) => {
    const users = await User.find({}).sort({created: -1})

    res.status(200).json(users)
}

//get a single user
const getUser = async (req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such User!!'})
    }

    const user = await User.findById(id)

    if(!user) {
        return res.status(404).json({error: 'No such user'})
    }

    res.status(200).json(user)
}

//create a  new user
const createUser = async(req,res) =>{
    const {firstName, lastName, age, address, email, nic, mobile} = req.body

    let emptyFields = []

    if(!firstName){
        emptyFields.push('firstName')
    }
    if(!lastName){
        emptyFields.push('lastName')
    }
    if(!age){
        emptyFields.push('age')
    }
    if(!address){
        emptyFields.push('address')
    }
    if(!email){
        emptyFields.push('email')
    }
    if(!nic){
        emptyFields.push('nic')
    }
    if(!mobile){
        emptyFields.push('mobile')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error:'please fill in all the fields',emptyFields})
    }

    //add doc to db
    try{
        const user = await User.create({firstName, lastName, age, address, email, nic, mobile})
        res.status(200).json(user)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}



//delete a user
const  deleteUser = async(req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such User!!'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if(!user) {
        return res.status(404).json({error: 'No such user'})
    }

    res.status(200).json(user)

}


//update a user
const updateUser = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such User!!'})
    }

    const user = await User.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!user) {
        return res.status(404).json({error: 'No such user'})
    }

    res.status(200).json(user)


}









module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}