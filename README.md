# bitcoinjs-wrapper
bitcoinjs wrapper (under development)

```
const bitcoin = require('./bitcoin')
const CONFIG  = require('./config')
const api     = require('./api_service')

const secretKey = 'secret-key'
const user      = bitcoin.create(secretKey)
const address   = user['address']
const wif       = user['wif']

console.log(address, wif)

// get balance
api.fetchBalance(address).then(function (balance) {
  console.log(balance)
})

// get utxo
api.fetchUTXO(address).then(function (utxos) {
  console.log(utxos)
})

// transfer bitcoins
api.fetchUTXO(address).then(function (utxos) {

  rawtx = bitcoin.createTransaction(secretKey, 'mwCwTceJvYV27KXBc3NJZys6CjsgsoeHmf', 10000, 1000, utxos)
  api.transaction(rawtx).then(function (value) {
    console.log(value)
  })
})
```
