const express = require('express');
const { getalldata, createdata, deletedate, updatedata } = require('../controllers/TransactionController');
const router = express.Router();
const Protect = require('../middleware/auth')

router.get('/',Protect,getalldata)
router.post("/",Protect,createdata)
router.delete('/:id',Protect,deletedate)
router.put('/:id',Protect,updatedata)


module.exports = router