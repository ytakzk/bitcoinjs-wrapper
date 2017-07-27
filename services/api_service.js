const request = require('request')
const CONFIG  = require('../config')
const ERROR   = require('../error')

const fetch = async (url) => {

  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      error != null ? reject(error) : resolve(body)
    })
  })
}

const fetchJson = async (url) => {

  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      error != null ? reject(error) : resolve(JSON.parse(body))
    })
  })
}

const post = async (url, data) => {

  return new Promise((resolve, reject) => {
    request.post(url, {form: data}, function (error, response, body) {
      error != null ? reject(error) : resolve(body)
    })
  })
}

// fetch balance
exports.fetchBalance = async function(address) {

  const url = CONFIG.BALANCE_API.replace('ADDRESS', address)
  return await fetch(url)
}

// UTXO Unspent Transaction Output
exports.fetchUTXO = async function(address) {

  const url = CONFIG.UTXO_API.replace('ADDRESS', address)
  return await fetchJson(url)
}

// post transaction
exports.transaction = async function(rawtx) {

  return post(CONFIG.TRANSACTION_API, {'rawtx': rawtx})
}
