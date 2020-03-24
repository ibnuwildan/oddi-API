const express = require('express')
const { datapengirimController } = require('../controller')
const router = express.Router()
const { auth } = require('../helper/auth')


router.get('/getAllDatapengirim', datapengirimController.getDatapengirim);
router.post('/addDatapengirim', datapengirimController.addDataPengirim);


module.exports = router