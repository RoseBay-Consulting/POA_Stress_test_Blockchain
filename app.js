const Web3 = require("web3");
const utils = require('./utils/utils')
const ABI = require('./config/contractABI')
const config = require('./config/config')

const web3 = new Web3(config.wsProvider)
console.log("connected to : " + config.wsProvider)

web3.eth.defaultAccount = web3.eth.accounts[0]
const contractInstance = new web3.eth.Contract(ABI, config.contractAddress);

let tps = config.tps

const args = process.argv.slice(2);
if (args[0]) {
    tps = args[0]
}
console.log("tps  :", tps)

let i = 0;


// watch latest block
web3.eth.subscribe('newBlockHeaders')
    .on("data", async (blockHeader) => {
        // console.log("ondata - blockHeader : ", blockHeader)
        web3.eth.getBlock(blockHeader.number, true).then((result) => {
            utils.saveInput(`${tps}_blockinfo`, {
                blockNumber: blockHeader.number,
                txlength: result.transactions.length,
                gasUsed: result.gasUsed,
                timestamp: result.timestamp,
                size: result.size
            })
        })
    })
    .on("error", console.error)

// watch for event logs
contractInstance.events.LogOfTxWithoutAffiliate()
    .on("data", (result) => {
        // console.log("LogOfTxWithoutAffiliate", result.returnValues)
        utils.saveInput(`${tps}_tps_web3eventlogs`, {
            lognumber: result.returnValues.discounttotal,
            logtimestamp1: result.returnValues.total,
            logtimestamp2: utils.getCurentDateTime()
        }, tps)
    })
    .on("changed", (event) => {
        console.log("event-changed : ", event)
        utils.saveInput(`${tps}_tps_web3eventlogs`, {
            lognumber: result.returnValues.discounttotal,
            logtimestamp1: result.returnValues.total,
            logtimestamp2: utils.getCurentDateTime()
        }, tps)
    })
    .on("error", console.error)



// call smart contract function
const sendTxn = async (func, args) => {

    return new Promise((resolve, reject) => {

        try {
            const data = contractInstance.methods[func].apply(null, args).encodeABI();
            web3.eth.estimateGas({
                to: config.contractAddress,
                data: data,
            }).then((gas) => {
                const txObject = {
                    from: config.adminAccountAddress,
                    gasPrice: '10000000000',
                    gas: gas,
                    to: config.contractAddress,
                    value: '0',
                    data: data,
                };
                // contractInstance.methods[func].apply(null,args).send(txObject)
                web3.eth.sendTransaction(txObject)
                    .on('transactionHash', function (hash) {
                        resolve({
                            number: args[7],
                            timestamp1: args[8],
                            timestamp2: utils.getCurentDateTime()
                        })
                    })
                    .on('receipt', function (receipt) {
                        // console.log("receipt : ", receipt)
                        if (receipt.logs[0].removed === 'true') {
                            utils.saveInput(`${tps}_tps_web3receipt`, {
                                number: args[7],
                                removed: receipt.logs[0].removed
                            })
                        }

                    })
                    .on('error', function (error) {
                        utils.saveInput(`${tps}_tps_error`, {
                            error: error
                        })
                        console.log(error)
                    })
            })
        } catch (e) {
            console.error(e);
            reject(e)
        }
    })


}



const d1 = new Date();
const d2 = new Date(d1);
const time = d2.setMinutes(d1.getMinutes() + config.time);
/**
 * call at regular interval and terminate after calculated time
 */
const x = setInterval(async () => {
    try {
        if (Date.now() < time) {
            const temp = utils.increment(i)
            const args = [1,
                '0x37343038',
                '0x42',
                '0x50656e64696e672046756c66696c6c6d656e74',
                '0x6131',
                '0x436f62756e6120486f6c64696e6773',
                0,
                temp,
                utils.getCurentDateTime(),
                '0x322f31302f32303139'
            ]

            i++

            const result = await sendTxn('txwithoutAffiliate', args)

            utils.saveInput(`${tps}_tps_web3input`, result)


        } else {
            clearInterval(x)
            console.log("Completed.......Completed........Completed")
        }

    } catch (e) {
        console.error(e)
    }
}, 1000 / tps);







// var cluster = require('cluster');
// var numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//     for (let j = 0; j < numCPUs; j++) {
//         cluster.fork();
//     }
//     cluster.on('online', function(worker) {
//         console.log('Worker ' + worker.process.pid + ' is online');
//     });

//     cluster.on('exit', function(worker, code, signal) {
//         console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
//         console.log('Starting a new worker');
//         cluster.fork();
//     });
// } else {
//     var x = setInterval(doStuff1, 1000 / tps, time);
// }