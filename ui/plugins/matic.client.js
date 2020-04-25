import Vue from 'vue'
import Matic from '@maticnetwork/maticjs'

const matic = new Matic({
  maticProvider: process.env.MATIC_PROVIDER,
  parentProvider: process.env.MATIC_PROVIDER,
  rootChain: '0x43aF3840Ae89315A895cd0d734926EB39517d2DB'
})

// Init the matic network
matic.initialize()

Vue.prototype.$matic = matic
