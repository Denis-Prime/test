const express = require(`express`)
const app = express()
const main = require(`./src/routing`)
app.use(express.json())

app.use(main)
let err_handler = (err,req,res,next)=>{
    console.log(err)
    res.status(500).json()
}
app.use(err_handler)
module.exports = app;