const express = require('express')
const { ProductController } = require('../controller')
const router = express.Router()

router.get('/getAllProduct', ProductController.getProduct)
router.get('/getAllProductId', ProductController.getProductId)
router.post('/AddProduct', ProductController.addproductnew)
router.delete('/DeleteProduct', ProductController.DeleteProduct)
router.post('/EditProduct/:id', ProductController.EditProduct)




module.exports = router