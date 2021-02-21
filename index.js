#!/usr/bin/env node

import { CoinbasePro } from 'coinbase-pro-node'
import { getErrorMessage } from 'coinbase-pro-node/dist/error/ErrorUtil.js'

const args = process.argv.slice(2)
if (args.length !== 1) {
  console.error('amount and only amount must be specified')
  process.exit(1)
}

if (!args[0].match(/^\d+$/)) {
  console.error('amount must be a whole number only')
  process.exit(1)
}

const funds = parseInt(args[0], 10)
if (isNaN(funds)) {
  console.error('amount is not a number')
  process.exit(1)
}

if (funds <= 0) {
  console.error('amount must be > 0')
  process.exit(1)
}

const client = new CoinbasePro({
  apiKey: process.env.CBP_BOT_API_KEY,
  apiSecret: process.env.CBP_BOT_API_SECRET,
  passphrase: process.env.CBP_BOT_PASS,
  useSandbox: !!process.env.CBP_BOT_SANDBOX
})

client.rest.product.getProductStats('BTC-USD')
  .then(console.log)
  .then(() => client.rest.order.placeOrder({
    side: 'buy',
    type: 'market',
    product_id: 'BTC-USD',
    funds: funds
  }))
  .then(console.log)
  .catch((err) => {
    console.error(`Error: ${getErrorMessage(err)}`)
  })
