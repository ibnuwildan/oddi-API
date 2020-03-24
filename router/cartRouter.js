const express = require('express')
const { cartController } = require('../controller')
const router = express.Router()
const { auth } = require('../helper/auth')

router.post('/AddToCard', auth,cartController.addToCart);
router.get('/getTocart', auth,cartController.getCart);
router.delete('/Deletecart', cartController.Deletecart);
router.get('/totalharga', cartController.totalhargacart);

module.exports = router