const userController = require('./userController') // untuk mengakses semua fungsi di dlm user controller yg kemudian di export ke dlm modul export
const ProductController = require('./ProductController');
const cartController = require('./cartController')
const datapengirimController = require('./datapengirimController');

module.exports = {
    userController,
    ProductController,
    cartController,
    datapengirimController
}