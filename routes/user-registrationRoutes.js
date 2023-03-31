const userController = require('../controller/user-registrationController.js')
const patientController = require('../controller/post.js')
const patientVisitController = require('../controller/create.js')
const verifyjwt = require('../middleware/user-login-auth.js')

const route = require('express').Router()

route.post('/signup', userController.userSignUp)
route.post('/emailverify', userController.emailVerify)
route.post('/login', userController.loginUser)
route.get('/getprofile', verifyjwt ,  userController.getProfile)
route.get('/useremail', verifyjwt, userController.demoUser )
route.get('/search', userController.searchData)

// route.post('/addPatient', patientController.addPatient)
// route.post('/addVisit', patientVisitController.addVisit)
// route.get('/findata', patientVisitController.findData)


module.exports = route