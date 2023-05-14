const express = require('express')

const router = express.Router()

//controller functions
const {signupStudent, loginStudent} = require('../controllers/studentController')

//login route
router.post('/login', loginStudent)



//signup route
router.post('/signup',signupStudent)




//profile route
router.get('/profile',() =>{})

module.exports = router