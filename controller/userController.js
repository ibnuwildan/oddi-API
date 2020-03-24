const Crypto = require("crypto");
const { createJWTToken } = require('../helper/jwt');
const db = require('../database'); // db mengambil data dari folder database index.js

module.exports = {
    getUsers: (req, res) => { // req/request = data yg di ambil dari fron end , res = respon
        let sql = 'SELECT * FROM users;' // perintah yg di dlm sql 
        console.log(req.query)
        db.query(sql, (err, results) => { // fungsi data yg gagal akan masuk respon error if benar msk result (masuk ke database)
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    getLogin: (req, res) => {
        var username = req.query.username
        var password = req.query.password
        let sql = `SELECT * FROM  users WHERE users = '${username}' && password = '${password}'`;
        console.log(req.query)
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(result)
        })
    },
    login: (req, res) => {
        const { username, password } = req.body
        console.log(username)
        console.log(password)
        let hashPassword = Crypto.createHmac("sha256", "uniqueKey").update(password).digest("hex")
        console.log(hashPassword)
        let sql = `SELECT * FROM users where username='${username}' and password='${hashPassword}';`
        db.query(sql, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            if (results && results.length > 0) {
                let { id, username, password, email, role } = results[0]
                const token = createJWTToken({
                    id,
                    username,
                    password,
                    email,
                    role
                })
                console.log(token)
                return res.status(200).send({
                    id,
                    username,
                    // password,
                    email,
                    role,
                    token
                })
            }
            else {
                res.status(200).send('user or password invalid')
            }
        })
    },

    register: (req, res) => {
        let { username, email, password, role } = req.body
        let hashPassword = Crypto.createHmac("sha256", "uniqueKey").update(password).digest("hex")//untuk mengacak password
        console.log(username, email, hashPassword)
        let sqlinsert = `INSERT into users (username,password,email,role) values ('${username}','${hashPassword}','${email}','${role}');`
        db.query(sqlinsert, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            console.log(results)
            return res.status(200).send(results)
        })

    },

    KeepLogin: (req, res) => {
        res.status(200).send({ ...req.user, token: req.token})
    }

}