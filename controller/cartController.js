const db = require('../database');

module.exports = {
    addToCart: (req, res) => {
        console.log(req.body)
        const { idproduct, size, jmlh, price } = req.body
        let sql = `INSERT INTO cart(productid,iduser,size,kuantitas,harga,status) VALUES (${idproduct},${req.user.id},'${size}','${jmlh}','${price}','Unpaid');`
        db.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            }
            console.log(results)
            res.status(200).send(results)

        })
    },

    getCart: (req, res) =>{
        let sql = `select c.idcart, c.productid, c.iduser, c.size, c.kuantitas, c.harga, c.status, p.gambar, p.nama_product, p.description_product
        from cart c
        inner join product p
        on c.productid = p.idproduct
        where iduser=${req.user.id};`
        db.query(sql, (err, results) => { // fungsi data yg gagal akan masuk respon error if benar msk result (masuk ke database)
            if (err) {
                console.log(err)
                res.status(500).send(err)
            }
            console.log(results)
            res.status(200).send(results)
        })
    },

    Deletecart: (req, res) =>{
        
        let sql = `delete from cart where idcart = ${req.query.id}` 
        db.query(sql, (err, results)=>{
            if(err){
                console.log(err)
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },

    totalhargacart: (req,res) => {
        // console.log('idi',req.query.iduser)
        let sql = `SELECT SUM(harga) AS jumlahprice, iduser FROM cart WHERE iduser = ${req.query.iduser};`
        db.query(sql,(err, results)=>{
            if(err){
                console.log(err)
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },

    getcartpengiriman: (req,res)=>{
        let sql = `select * from cart;`
        db.query(sql,(err, results)=>{
            if(err){
                console.log(err)
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    }
}