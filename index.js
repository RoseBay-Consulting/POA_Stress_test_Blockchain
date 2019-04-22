const Web3 = require("web3");
const utils = require('./utils/utils')
const ABI = require('./config/contractABI')
const config = require('./config/config')

// var array = fs.readFileSync('ipaddress.txt').toString().split("\n");

// const endpoint = array[0]
// set the provider you want from Web3.providers
const web3 = new Web3(new Web3.providers.HttpProvider(config.rpcEndPoint));
console.log("connected to : " + config.rpcEndPoint)


// const web3 = new Web3()
// web3.setProvider(
//     new Web3.providers.WebsocketProvider(
//         config.wsEndPoint, {
//             headers: {
//               Origin: "some_meaningful_name"
//             }
//           }
//     )
//   );


let tps = config.tps


const args = process.argv.slice(2);
if(args[0]){
    tps = args[0]
}
console.log("tps  :", tps)



let i = 0;

web3.eth.defaultAccount = web3.eth.accounts[0]

const Contract = web3.eth.contract(ABI);

const contractInstance = Contract.at(config.contractAddress);

web3.eth.filter("latest").watch(function (error, result) {
    web3.eth.getBlock(result, function (error, result) {
        utils.saveBlockInfo(result)
    });
})

contractInstance.LogOfTxWithoutAffiliate().watch((error, result) => {
    try {
        if (!error) {
            if (result) {
                utils.saveLogs({
                    lognumber: result.args.discounttotal,
                    logtimestamp1: result.args.total,
                    logtimestamp2: utils.getCurentDateTime()
                },tps)
            } else {
                console.error({
                    error: "error in logs"
                })
            }
            // utils.saveInputToCsv(`${result.args.ccapproved} ,${utils.getCurentDateTime()}`, d + 'web3output.csv');

        } else {
            console.error({
                error: error
            })
            return true
        }
    } catch (e) {
        console.error(e)
    }

});




const sendTxn = async (func, args) => {

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
                        // reject({status: 'ERROR', code: 500, message: errorMessage.initialPurchase})
                    } else {
                        resolve({
                            number: args[7],
                            timestamp1: args[8],
                            timestamp2: utils.getCurentDateTime()
                        })
                        // resolve(successHandler.post(successMessage.sendRawTxn, result))

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

}



const doStuff1 = async (d2) => {

    try {
        if (Date.now() < d2) {
            const temp = utils.increment(i)
            const args = [1,
                '0x212341',
                '0x212341',
                '0x212341',
                '0x212341',
                '0x212341',
                1,
                temp,
                utils.getCurentDateTime(),
                '0x212341'
            ]

            i++

            sendTxn('txwithoutAffiliate', args).then((result) => {
                // console.log(result.number)
                utils.saveInput(result,tps)
            }).catch((e) => {
                console.log(e)
            })

            //console.log(i)


        } else {
            clearInterval(x)
            console.log("Completed.......Completed........Completed")
        }

    } catch (e) {
        console.error(e)
    }
}


var d1 = new Date();
var d2 = new Date(d1);
var time = d2.setMinutes(d1.getMinutes() + config.time);
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


var x = setInterval(doStuff1, 1000 / tps, time);