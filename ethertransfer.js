var Web3 = require('web3');
//var util = require('ethereumjs-util');
var tx = require('ethereumjs-tx');
//var lightwallet = require('eth-lightwallet');
var Wallet = require('ethereumjs-wallet');
//var txutils = lightwallet.txutils;
var fs = require('fs')

var contractAbi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "accountaddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "enodeaddress",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "isadding",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "issuspention",
				"type": "bool"
			}
		],
		"name": "LogOfVoteRejectConsensusMeet",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "acceptProposal",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_account",
				"type": "address"
			},
			{
				"name": "_enode",
				"type": "bytes32"
			}
		],
		"name": "addingVote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_account",
				"type": "address"
			},
			{
				"name": "_enode",
				"type": "bytes32"
			}
		],
		"name": "addNode",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_account",
				"type": "address"
			},
			{
				"name": "_enode",
				"type": "bytes32"
			}
		],
		"name": "addNodeProposal",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "resetProcess",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_percentage",
				"type": "uint256"
			}
		],
		"name": "setConsensus",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_account",
				"type": "address"
			},
			{
				"name": "_enode",
				"type": "bytes32"
			}
		],
		"name": "suspendNode",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_account",
				"type": "address"
			},
			{
				"name": "_enode",
				"type": "bytes32"
			}
		],
		"name": "suspendNodeProposal",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_account",
				"type": "address"
			},
			{
				"name": "_enode",
				"type": "bytes32"
			}
		],
		"name": "suspendVote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "accountaddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "enodeaddress",
				"type": "bytes32"
			}
		],
		"name": "LogOfSuspentionAcceptProposal",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_account",
				"type": "address"
			},
			{
				"name": "_enode",
				"type": "bytes32"
			}
		],
		"name": "voteReject",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "accountaddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "enodeaddress",
				"type": "bytes32"
			}
		],
		"name": "LogOfSuspendNodeProposal",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "accountaddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "enodeaddress",
				"type": "bytes32"
			}
		],
		"name": "LogOfAddNodeProposal",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "accountaddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "enodeaddress",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "rejectcount",
				"type": "uint256"
			}
		],
		"name": "LogOfVoteReject",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "accountaddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "enodeaddress",
				"type": "bytes32"
			}
		],
		"name": "LogOfAddingAcceptProposal",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "accountaddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "enodeaddress",
				"type": "bytes32"
			}
		],
		"name": "LogOfSuspentionVote",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "accountaddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "enodeaddress",
				"type": "bytes32"
			}
		],
		"name": "LogOfSuspentionNode",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "accountaddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "enodeaddress",
				"type": "bytes32"
			}
		],
		"name": "LogOfsuspentionConsensusMeet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "accountaddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "enodeaddress",
				"type": "bytes32"
			}
		],
		"name": "LogOfAddingVote",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "accountaddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "enodeaddress",
				"type": "bytes32"
			}
		],
		"name": "LogOfAddingConsensusMeet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "accountaddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "enodeaddress",
				"type": "bytes32"
			}
		],
		"name": "LogOfAddNode",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "previousaccount",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "previousenode",
				"type": "bytes32"
			}
		],
		"name": "LogOfResetProcess",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "consensuslimit",
				"type": "uint256"
			}
		],
		"name": "LogOfSetConsensus",
		"type": "event"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "addingmutex",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_enode",
				"type": "bytes32"
			}
		],
		"name": "checkNode",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "consensuspercentage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isadding",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "issuspention",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "LimitOfNegVote",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "LimitOfVote",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "nodeconformations",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "NodeCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "nodeinfo",
		"outputs": [
			{
				"name": "enode",
				"type": "bytes32"
			},
			{
				"name": "account",
				"type": "address"
			},
			{
				"name": "flag",
				"type": "bool"
			},
			{
				"name": "votecount",
				"type": "uint256"
			},
			{
				"name": "rejectcount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "previousaccount",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "previousenode",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "suspentionmutex",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
var contractAddress = '0xee1d05bf36147425cfb38d777202263ceaff70cb';




// establish connection
// read data from config.json file
//var result = require('./config.json')



var web3 = new Web3()

// calling api for rpcendpoint
var request = require('request')
request.post({url:'http://35.200.172.1:8090/getEndPoints', form: {}}, function(err,httpResponse,body){
	var resp = JSON.parse(body)
	var result = resp.endPoints
	console.log(result)
	
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

	 const myWallet = Wallet.fromV3(fs.readFileSync('keystore').toString(), 'tilak', true);
var priKey = myWallet.getPrivateKey().toString('hex');
console.log("Private Key: " + priKey );
var addr = '0x'+myWallet.getAddress().toString('hex')
console.log("Address: " , addr )
console.log("Balance: " ,web3.eth.getBalance(addr))

const Contract = web3.eth.contract(contractAbi);
const contractInstance = Contract.at(contractAddress);


contractInstance.LogOfAddingConsensusMeet().watch((error,result) => {
	if(!error){
		var txnCount = web3.eth.getTransactionCount(addr)
		var rawTxn = {
			nonce: web3.toHex(txnCount),
			gasPrice: web3.toHex(100000000000),
			gasLimit: 21000,
			to: result.args.accountaddress,
			value: 1000000000000000000,
			data: null,
		};
		
		console.log("raw transaction :", rawTxn)
		
		sendRaw(rawTxn);
		console.log("adding consensusmeet successful")
		console.log("ether transfer succssful to account :", result.args.accountaddress," value : ", rawTxn.value)
		
	}else{
		console.log("something went wrong", error)
	}
})

contractInstance.LogOfAddingAcceptProposal().watch((error,result) => {
	if(!error){
		var txnCount = web3.eth.getTransactionCount(addr)
		var rawTxn = {
			nonce: web3.toHex(txnCount),
			gasPrice: web3.toHex(100000000000),
			gasLimit: 21000,
			to: result.args.accountaddress,
			value: 1000000000000000000,
			data: null,
		};
		
		console.log("raw transaction :", rawTxn)
		
		sendRaw(rawTxn);
		console.log("adding accept proposal successful")
		console.log("ether transfer succssful to account :", result.args.accountaddress," value : ", rawTxn.value)
		
	}else{
		console.log("something went wrong", error)
	}
})

function sendRaw(rawTx) {
    var privateKey = new Buffer(priKey, 'hex');
	console.log("privatekey raw : ", privateKey)
    var transaction = new tx(rawTx);
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');
    web3.eth.sendRawTransaction(
        '0x' + serializedTx, function(err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
}


})


/*
// array of json object
Object.keys(result).forEach(function(key) {
  console.log('Key : ' + key + ', Value : ' + result[key])
})
*/
/*
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
*/

