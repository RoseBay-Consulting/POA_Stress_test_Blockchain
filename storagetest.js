//utils = require('../utils/utils')
console.log("connected to local network")


//var i = 0;
//var j = 0;
eth.defaultAccount = eth.accounts[1]
var abi = [ { "constant": true, "inputs": [], "name": "cauid", "outputs": [ {  "name": "", "type": "bytes32"}], "payable": false,"stateMutability": "view", "type": "function" },{ "constant": false,"inputs": [{ "name": "uid","type": "uint256"},{ "name": "_plid","type": "bytes32"},{"name": "_iid","type": "bytes32"}],"name": "getID","outputs": [{"name": "","type": "bytes32"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": false,"name": "cauid","type": "bytes32"},{"indexed": false,"name": "uid","type": "uint256"}],"name": "LogOfCauidGen","type": "event"} ]
var Contract = eth.contract(abi)
var contractInstance = Contract.at("0x2608c7cdb42b10e5097cc774202450e53743ecd5");

var myEvent = contractInstance.LogOfStorage({}, {fromBlock: 0, toBlock: 'latest'});

myEvent.watch(function(error, result){
  if (!error) {
    console.log(result)
          // utils.saveInputToCsv(`${result.args.data} ,${utils.getCurentDateTime()}`, 'web3output.csv');
   
   
          // j++
   
   }else{
   console.log(error)
   }
});


contractInstance.getID(N2, "0x2", "0x3", {gas:32000})
/*

contractInstance.LogOfStorage().watch((error, result) => {

    if (!error) {
 console.log('got event' + j)
        utils.saveInputToCsv(`${result.args.data} ,${utils.getCurentDateTime()}`, 'web3output.csv');


        j++

}else{
console.log(error)
}

});





var doStuff1 = function () {
	
    var uid = i

  estgas = contractInstance.set.estimateGas(i)
  var start = new Date().getTime();
contractInstance.set(uid,{gas:estgas})
var end = new Date().getTime();

 utils.saveInputToCsv(`${uid} ,${utils.getCurentDateTime()}`, 'web3input.csv');
  i++

  console.log(end-start)

};

setInterval(doStuff1,100);


*/













