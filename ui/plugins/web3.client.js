import Vue from 'vue'
import Web3 from 'web3'

import SequenceMetadataABI from '~/assets/contracts/SequenceMetadata'
import SubmittedSequenceABI from '~/assets/contracts/SubmittedSequence'

import { BinSequenceMetadata, BinSubmittedSequence } from '~/assets/js/bytecodes'

const ContractAddress = {
  RoleControl: process.env.ADDRESS_CONTRACT_ROLE_CONTROL
};

(async () => {
  let web3
  if (window.ethereum) {
    web3 = new Web3(window.ethereum)
    try {
      // Request account access if needed
      await ethereum.enable()
    } catch (error) {
      console.error(error)
    }
  } else web3 = new Web3(Web3.givenProvider || process.env.ETHEREUM_PROVIDER)

  web3.account = (await web3.eth.getAccounts())[0]
  web3.contractSequenceMetadata = new web3.eth.Contract(
    SequenceMetadataABI.abi
  )
  web3.contractSequenceMetadata.options.data = '0x' + BinSequenceMetadata.object
  web3.contractSubmittedSequence = new web3.eth.Contract(
    SubmittedSequenceABI.abi
  )
  web3.contractSubmittedSequence.options.data = '0x' + BinSubmittedSequence.object
  Vue.prototype.$web3 = web3
  window.dapp = web3
})()
