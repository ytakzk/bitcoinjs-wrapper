const express = require('express')
const router  = express.Router()
const indexController = require('./controllers/index_controller')

router.get('/', function (req, res) {

  indexController.index(req, res)
})

router.get('/create/:secretKey', function (req, res) {

  indexController.create(req, res)
})

router.get('/balance/:secretKey', function (req, res) {

  indexController.balance(req, res)
})

router.get('/transfer/:secretKey/:to/:amount', function (req, res) {

  indexController.transfer(req, res)
})

module.exports = router
