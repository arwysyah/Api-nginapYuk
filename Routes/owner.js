
const router = require('express').Router();


const {registerOwner,login,getOwner,updateOwner,getOwnerByID,getOwnerStatus
    ,getOwnerCar,updateOwnerPassword,resetPassword} = require ('../Controllers/owner')

router.post('/register',registerOwner)
router.patch('/edit/:id',updateOwner)
router.get('/status',getOwnerStatus)
router.get('/carOwner',getOwnerCar)
router.get('/:id',getOwnerByID)
router.post('/login',login)
router.get('/',getOwner)
router.get('/updateOwner/:email',updateOwnerPassword)
router.get('/resetpassword/Owner/:email',resetPassword)


module.exports = router