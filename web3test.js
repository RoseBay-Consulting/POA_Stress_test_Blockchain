Web3 = require("web3");

if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

console.log(web3.eth.getTransactionCount("0x36fcea85658cc30c1d1d56e1522aa9de12fc00bd"))
console.log("connected to local network")
        }


