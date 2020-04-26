import Vue from 'vue'
import Web3 from 'web3'

(async() => {
  let web3
  if (window.ethereum) {
    web3 = new Web3(window.ethereum)
    try {
      // Request account access if needed
      await ethereum.enable()
    } catch(error) {
      console.error(error)
    }
  } else web3 = new Web3(Web3.givenProvider || process.env.ETHEREUM_PROVIDER)

  web3.account = (await web3.eth.getAccounts())[0]
  Vue.prototype.$web3 = web3
  window.dapp = web3
})()
