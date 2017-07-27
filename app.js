var express = require('express')
var app     = express()
var path    = require('path')

const router  = require('./router')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(router)

process.on('unhandledRejection', console.dir)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
