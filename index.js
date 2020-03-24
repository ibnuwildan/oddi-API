const express = require('express')
const cors = require ('cors')
const bodyParser = require ('body-parser')
const bearerToken = require('express-bearer-token');
const PORT = 2020

const app = express()
app.use(bearerToken())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.status(202).send('<h1> selamat datang API latihan </h1>')
})

const{ userRouter, ProductRouter,cartRouter,datapengirimRouter } = require ('./router')
app.use('/users', userRouter)
app.use('/product', ProductRouter)
app.use('/cart', cartRouter)
app.use('/datapengirim', datapengirimRouter)



app.listen(PORT, ()=> console.log(`API berhasil aktif di PORT ${PORT}`))

