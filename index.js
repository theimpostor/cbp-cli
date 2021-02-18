#!/usr/bin/env node

import { CoinbasePro } from 'coinbase-pro-node'
import { getErrorMessage } from 'coinbase-pro-node/dist/error/ErrorUtil.js'

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
    funds: 100000000
  }))
  .then(console.log)
  .catch((err) => {
    console.error(`Error: ${getErrorMessage(err)}`)
  })
