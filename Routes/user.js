const router = require('express').Router();


const {registerUser,login,getUser,updateUser,getUserByID,updateUserPassword,resetPassword} = require ('../Controllers/user')

router.post('/register',registerUser)

router.post('/login',login)
router.get('/',getUser)
router.get('/:id',getUserByID)
router.patch('/edit/:id',updateUser)
router.patch('/passworduser/:email',updateUserPassword)
router.patch('/resetpassword/user/:email',resetPassword)

module.exports = router