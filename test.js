var Web3 = require('web3');
//var util = require('ethereumjs-util');
var tx = require('ethereumjs-tx');
//var lightwallet = require('eth-lightwallet');
var Wallet = require('ethereumjs-wallet');
//var txutils = lightwallet.txutils;
var fs = require('fs')




// establish connection
// read data from config.json file
var result = require('./config.json')
console.log(result)
/*
// array of json object
Object.keys(result).forEach(function(key) {
  console.log('Key : ' + key + ', Value : ' + result[key])
})
*/
var web3 = new Web3()
for( var key in result) {
   web3.setProvider(new web3.providers.HttpProvider(result[key]));
if(web3.isConnected()){
console.log("connected to :", result[key]);
break;
}
}
if(!web3.isConnected()){
console.log("rpc endpoint not available")
}

const myWallet = Wallet.fromV3(fs.readFileSync('testing').toString(), 'testing', true);
var priKey = myWallet.getPrivateKey().toString('hex');
console.log("Private Key: " + priKey );
web3.eth.getGasPrice(function(err,r){console.log("gas prie .........", r)})
var addr = '0x'+myWallet.getAddress().toString('hex')
console.log("Address: " , addr )
console.log("Balance: " ,web3.eth.getBalance(addr))


		var txnCount = web3.eth.getTransactionCount(addr)
		var rawTxn = {
			nonce: web3.toHex(txnCount),
			gasPrice: web3.toHex(100000000000),
			gasLimit: 21000,
			to: "0xf220915a2b40e03215ec28798dbab32c16dee8e4",
			value: 1000000000000000000,
			data: null,
		};
		
		console.log("raw transaction :", rawTxn)
		
		sendRaw(rawTxn);
	

		console.log("ether transfer succssful to account :", rawTxn.to," value : ", rawTxn.value)
		
	
function sendRaw(rawTx) {
    var privateKey = new Buffer(priKey, 'hex');
	console.log("privatekey raw : ", privateKey)
    var transaction = new tx(rawTx);
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');
    console.log(serializedTx)
    web3.eth.sendRawTransaction(
        '0x' + serializedTx, function(err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
}
