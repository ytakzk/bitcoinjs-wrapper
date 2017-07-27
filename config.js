const bitcoin = require('bitcoinjs-lib')
const isTest  = true

let config = isTest ? {
  NETWORK_MODE:    bitcoin.networks.testnet,
  BALANCE_API:     'https://testnet.blockexplorer.com/api/addr/ADDRESS/balance',
  UTXO_API:        'https://testnet.blockexplorer.com/api/addr/ADDRESS/utxo',
  TRANSACTION_API: 'https://testnet.blockexplorer.com/api/tx/send',
  IS_TEST:         true
} : {
  NETWORK_MODE: bitcoin.networks.bitcoin,
  BALANCE_API:     'https://blockexplorer.com/api/addr/ADDRESS/balance',
  UTXO_API:        'https://blockexplorer.com/api/addr/ADDRESS/utxo',
  TRANSACTION_API: 'https://blockexplorer.com/api/tx/send',
  IS_TEST:         false
}

module.exports = config
