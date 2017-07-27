const CONFIG  = require('../config')
const bitcoin = require('../services/bitcoin_service')
const api     = require('../services/api_service')

const IndexController = {

  index: function (req, res) {

    res.render('index')
  },

  create: function (req, res) {

    const secretKey = req.params['secretKey']
    res.json(bitcoin.create(secretKey))
  },

  balance: async function (req, res) {

    const secretKey = req.params['secretKey']
    const address   = bitcoin.create(secretKey)['address']

    try {

      const balance = await api.fetchBalance(address)
      res.json({ balance: balance })

    } catch(error) {

        res.status(500).json({ error: error })
    }
  },

  transfer: async function (req, res) {

    const secretKey = req.params['secretKey']
    const to        = req.params['to']
    const amount    = Number(req.params['amount'])
    const address   = bitcoin.create(secretKey)['address']

    try {

      const utxos = await api.fetchUTXO(address)

      rawtx = bitcoin.createTransaction(secretKey, to, amount, 1000, utxos)

      const result = await api.transaction(rawtx)

      res.json(JSON.parse(result))

    } catch(error) {

        res.status(500).json({ error: error })
    }
  }
}

module.exports = IndexController
