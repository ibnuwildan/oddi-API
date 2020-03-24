const db = require('../database');

module.exports = {

    getDatapengirim: (req, res) => {
        let sql = `SELECT * FROM datapengiriman where iddatapengiriman=${req.query.iduser};`
        console.log(req.query)
        db.query(sql, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },

    addDataPengirim: (req, res) => {
        console.log(req.body)
        const { iduser, idcart, nama, no_hp, provinsi, kota, kode_pos, alamat } = req.body
        let sql = `SELECT * FROM datapengiriman where iduser=${iduser}`
        db.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err)
            }
            console.log(results)
            if (results.length > 0) {
                let update = `UPDATE datapengiriman set nama='${nama}',no_hp='${no_hp}',provinsi='${provinsi}',kota='${kota}',kode_pos='${kode_pos}',alamat='${alamat}' where iddatapengiriman=${results[0].iddatapengiriman}`
                db.query(update, (err, results) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err)
                    }
                    console.log(results)
                    // res.status(200).send(results)

                })
            } else {
                let sql = `INSERT INTO datapengiriman(iduser,nama,no_hp,provinsi,kota,kode_pos,alamat) VALUES ('${iduser}','${nama}','${no_hp}','${provinsi}','${kota}','${kode_pos}','${alamat}');`
                db.query(sql, (err, results) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err)
                    }
                    console.log(results)
                    res.status(200).send(results)

                })
            }

        })

    }

}