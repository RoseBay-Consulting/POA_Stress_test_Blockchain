const Web3 = require('web3');
const axios = require('axios');
const tx = require('ethereumjs-tx');
const config = require('../config/config');
const ABI = require('../config/contractABI');
const saveToCsv = require('../utils/util')
let web3, contractInstance;

module.exports = {

    init: async () => {

        try {

            console.log(`Attempting RPC connection to ${config.rpcEndPoint} ...`);
            web3 = new Web3(new Web3.providers.HttpProvider(config.rpcEndPoint));
            console.log(`Connection successful!`);

            web3.eth.defaultAccount = web3.eth.accounts[0]

            console.log(`Creating an instance for the contract at address ${config.contractAddress} ...`);
            const Contract = web3.eth.contract(ABI);
            contractInstance = Contract.at(config.contractAddress);
            console.log(`Contract instance successfully created`);

            if (process.env.NODE_ENV === 'testing') {
                web3.eth.filter("latest").watch(function (error, result) {
                    web3.eth.getBlock(result, function (error, result) {
                        saveToCsv.saveBlockInfo(result)
                    });
                })
                // let blockNumber = 1006
                // for( let i=0;i<50;i++)  {
                //     web3.eth.getBlock(blockNumber,function(error,result){
                //         saveToCsv.saveBlockInfo(result)
                //     })
                //     blockNumber++
                //     i++
                // }
            }

        } catch (e) {

            console.error(e)

        }

    },

    sendTxn: async (func, args) => {

        const data = await contractInstance[func].getData.apply(null, args);

        return new Promise((resolve, reject) => {

            try {

                web3.eth.estimateGas({
                    to: config.contractAddress,
                    data: data,
                    from: config.adminAccountAddress
                }, (err, gasLimit) => {
                    const txObject = {
                        gasPrice: web3.toHex(100000000000),
                        gas: gasLimit,
                        to: config.contractAddress,
                        value: web3.toHex(0),
                        data: data,
                    };

                    web3.eth.sendTransaction(txObject, (err, result) => {
                        if (err) {
                            console.error(err);
                            reject({
                                status: 'ERROR',
                                code: 500,
                                message: errorMessage.initialPurchase
                            })
                        } else {
                            resolve(successHandler.post(successMessage.sendRawTxn, result))
                        }
                    })

                });


            } catch (e) {
                console.error(e);
                reject({
                    status: 'ERROR',
                    code: 500,
                    message: errorMessage.initialPurchase
                })
            }
        })

    },

    fromUtf8: (value) => {
        return web3.fromUtf8(value)
    },

    toUtf8: (value) => {
        return web3.toUtf8(value)
    },

    fromWei: (value) => {
        return web3.fromWei(value)
    },

    fromASCII: (value) => {
        return web3.fromASCII(value)
    },

    toASCII: (value) => {
        return web3.toASCII(value)
    },

    getTxCount: () => {
        return web3.eth.getTransactionCount(config.adminAccountAddress);
    },

    defineLogs: () => {
        return contractInstance
    }

};