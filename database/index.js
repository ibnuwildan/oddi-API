const mysql = require('mysql') // untuk mengakses mysql 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'ibnu',
    password: 'root',
    database: 'oddi',
    port: 3306,
    multipleStatements: true
})

module.exports = db