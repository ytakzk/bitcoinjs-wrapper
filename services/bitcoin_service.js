const bitcoin = require('bitcoinjs-lib')
const bigi    = require('bigi')
const CONFIG  = require('../config')
const ERROR   = require('../error')

// Generate a hashed value from a secret key
function hash(secretkey) {

  return bitcoin.crypto.sha256(bitcoin.crypto.sha256(secretkey))
}

// Create a key pair from a secret key
function generateKeyPair(secretKey) {

  const d    = bigi.fromBuffer(hash(secretKey))
  return new bitcoin.ECPair(d, null, {network: CONFIG.NETWORK_MODE})
}

// Generate an address and a wif from  a secret key
exports.create = function(secretKey) {

  var keyPair = generateKeyPair(secretKey)
  var wif     = keyPair.toWIF()
  var address = keyPair.getAddress()

  return {'address': address, 'wif': wif}
}

// Create a transaction
exports.createTransaction = function(secretKey, to, amount, fee, utxos) {

  if (utxos.length == 0) {
    throw new Error(ERROR.INVALID_UTXOS)
  }

  const tx      = new bitcoin.TransactionBuilder(CONFIG.NETWORK_MODE)
  const keyPair = generateKeyPair(secretKey)
  const account = this.create(secretKey)
  const from    = account['address']

  var total = 0
  utxos.forEach(function(utxo, index) {
    const txid          = utxo['txid']
    const vout          = utxo['vout']
    const satoshis      = utxo['satoshis']
    const confirmations = utxo['confirmations']

    total += satoshis
    tx.addInput(txid, vout)
  })

  tx.addOutput(from, total - amount - fee)
  tx.addOutput(to, amount)

  tx.tx.ins.forEach(function(input, index) {
      tx.sign(index, keyPair)
  })

  return tx.build().toHex()
}
