export const sendTxn = async (txn, accountAddress, web3) => {
  return await txn.send({from: accountAddress})
}

export const newContractTxn = async (initContract, args, address, web3) => {
  if (!web3)  web3 = window.dapp
  if (!address) address = web3.account
  return await sendTxn(initContract.deploy({
    arguments: args
  }), address, web3)
}