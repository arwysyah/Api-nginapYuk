const {getsubTrans,postsubTrans,getsubTransByID,getsubTransByDate,getsubTransByIDCustomer,updatesubTransByID,updatesubTransAccept,selectedbyDate} = require ('../Controllers/transaction')
const express = require ('express');
const router = express.Router() // manggil router


router.get('/',getsubTrans)
router.post('/',postsubTrans)
router.get('/:id',getsubTransByID)
router.get('/:date',getsubTransByDate)
router.get('/customer/:id',getsubTransByIDCustomer)
router.patch('/history/:id',updatesubTransByID)
router.patch('/accept/:id',updatesubTransAccept)
router.get('/today/:id/:date',selectedbyDate)
module.exports = router