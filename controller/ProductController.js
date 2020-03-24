const db = require('../database');
const { uploader } = require('../helper/uploader');
const fs = require('fs'); //unutk akses file ofline

module.exports = {
    getProduct: (req, res) => { // req/request = data yg di ambil dari fron end , res = respon
        let sql = 'SELECT * FROM product;' // perintah yg di dlm sql 
        console.log(req.query)
        db.query(sql, (err, results) => { // fungsi data yg gagal akan masuk respon error if benar msk result (masuk ke database)
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },

    DeleteProduct: (req, res) => {

        let sql = `delete from product where idproduct = ${req.query.id}`
        db.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                return res.statu(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    EditProduct: (req, res) => {
        console.log(req.body)
        console.log(req.params.id)
        const { nama_product, gambar, description_product, price } = req.body
        let sql = `UPDATE product set nama_product = '${nama_product}',gambar='${gambar}',description_product='${description_product}',price=${price} WHERE idproduct = ${req.params.id}`
        db.query(sql, req.body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err)
            }
            console.log('error')
            console.log(results)
            res.status(200).send(results)
        })
    },

    getProductId: (req, res) => { // req/request = data yg di ambil dari fron end , res = respon
        console.log(req.query.id)
        let sql = `SELECT * FROM product WHERE idproduct=${req.query.id};` // perintah yg di dlm sql 
        db.query(sql, (err, results) => { // fungsi data yg gagal akan masuk respon error if benar msk result (masuk ke database)
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    AddProduct: (req, res) => {
        console.log(req.body)
        const { nama_product, gambar, description_product, price } = req.body
        let sql = `INSERT INTO product (nama_product,gambar,description_product,price) VALUES ('${nama_product}', '${gambar}', '${description_product}', ${price})`
        db.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },

    addproductnew: (req, res) => {
        console.log('uploader')
        // console.log(req.files)
        try {
            const path = '/images'
            const upload = uploader(path, 'IMG').fields([{ name: 'image' }])

            upload(req, res, (err) => {
                if (err) {
                    return res.status(500).send({ message: 'error' })
                }
                const { image } = req.files;
                const imagePath = image ? path + '/' + image[0].filename : null
                console.log(image)
                console.log(req.body.data)
                const data = JSON.parse(req.body.data)
                data.gambar = imagePath
                let sql = `INSERT INTO product set ? `
                db.query(sql, data, (err, results) => {
                    if (err) {
                        console.log(err)
                        fs.unlinkSync('./public' + imagePath) //kalo error delete file
                        return res.status(500).send(err)
                    }
                    res.status(200).send(results)
                })
            })
        }
        catch (err) {
            return res.status(500).send({ message: 'error' })
        }
    }



}