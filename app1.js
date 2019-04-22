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
let i = 0;

web3.eth.defaultAccount = web3.eth.accounts[0]

const Contract = web3.eth.contract(ABI);

const contractInstance = Contract.at(config.contractAddress);

contractInstance.LogOfTxWithoutAffiliate({},{fromBlock:1774,toBlock:1794}).get((error, result) => {
    try {
        if (!error) {
            if(result){
				console.log(result.length)
                // utils.saveLogs({
                //     lognumber: result.args.discounttotal,
                //     logtimestamp: utils.getCurentDateTime()
                // })
            }else{
                console.error({error:"error in logs"})
            }
            // utils.saveInputToCsv(`${result.args.ccapproved} ,${utils.getCurentDateTime()}`, d + 'web3output.csv');

        } else {
            console.error({error:error})
            return true
        }
    } catch (e) {
        console.error(e)
    }

});


