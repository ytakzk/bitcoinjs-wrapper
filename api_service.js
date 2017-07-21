const request = require('request')

BALANCE_API     = 'https://testnet.blockexplorer.com/api/addr/ADDRESS/balance'
UTXO_API        = 'https://testnet.blockexplorer.com/api/addr/ADDRESS/utxo'
TRANSACTION_API = 'https://testnet.blockexplorer.com/api/tx/send'

function fetch(url) {

  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (error != null || response.statusCode != 200) {
        console.log(error)
        resolve(0)
      }
      resolve(body)
    })
  })
}

function fetchJson(url) {

  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (error != null || response.statusCode != 200) {
        console.log(error)
        resolve(0)
      }
      resolve(JSON.parse(body))
    })
  })
}

function post(url, data) {

  return new Promise((resolve, reject) => {
    request.post(url, {form: data}, function (error, response, body) {
      if (error != null || response.statusCode != 200) {
        console.log(error)
        resolve(0)
      }
      resolve(body)
    })
  })
}

// fetch balance
exports.fetchBalance = function(address) {

  const url = BALANCE_API.replace('ADDRESS', address)
  return fetch(url)
}

// UTXO Unspent Transaction Output
exports.fetchUTXO = function(address) {

  const url = UTXO_API.replace('ADDRESS', address)
  return fetchJson(url)
}

// post transaction
exports.transaction = function(rawtx) {

  return post(TRANSACTION_API, {'rawtx': rawtx})
}
