const db = require('../database');

module.exports = {

    getDatapengirim: (req, res) => {
        let sql = `SELECT * FROM datapengiriman where iduser=${parseInt( req.query.iduser)};`
        console.log(req.query)
        db.query(sql, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            // console.log(results)
            res.status(200).send(results)
        })
    },

    addDataPengirim: (req, res) => {
        console.log(req.body)
        const { iduser, idcart, nama, no_hp, provinsi, kota, kode_pos, alamat } = req.body
        var renderinvoice = ''
        idcart.map((val) => {
            renderinvoice += val
        })
        console.log(renderinvoice)
        let sql = `INSERT INTO datapengiriman(iduser,nama,no_hp,provinsi,kota,kode_pos,alamat,invoice) VALUES ('${iduser}','${nama}','${no_hp}','${provinsi}','${kota}','${kode_pos}','${alamat}','order_${renderinvoice}');`
        db.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err)
            }
            // console.log(results)
            // res.status(200).send(results)

            // if (results.length > 0) {
                idcart.map((val) => {
                    let updatecart = `UPDATE cart set invoice ='order_${renderinvoice}' where idcart =${val}; `
                    db.query(updatecart,req.body,(err, resultsupdate)=>{
                        if(err){
                            console.log(err)
                            return res.status(500).send(err)
                        }
                        console.log('updatecart',resultsupdate)
                    })  
                })
                res.status(200).send(results)
            // }
        })
    }

}