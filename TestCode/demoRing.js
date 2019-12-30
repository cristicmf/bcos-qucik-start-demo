
/**
 * @file: demoHelloWorld.js
 * @author: fisco-dev
 * 
 * @date: 2017
 */

var Web3= require('web3');
var config=require('./config');
var fs=require('fs');
var execSync =require('child_process').execSync;
var web3sync = require('./web3sync');
var BigNumber = require('bignumber.js');


if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider(config.HttpProvider));
}

console.log(config);




var filename="simpleDemo";




var address=fs.readFileSync(config.Ouputpath+filename+'.address','utf-8');
var abi=JSON.parse(fs.readFileSync(config.Ouputpath/*+filename+".sol:"*/+filename+'.abi', 'utf-8'));
var contract = web3.eth.contract(abi);
var instance = contract.at(address);



console.log(filename+"合约address:"+address);



(async function(){

 var geta="setup";
 console.log("接口调用前读取接口返回:"+geta);
  
  var func = "set(string)";
  var params = ["1234,"];
  var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, address, func, params);

  geta = instance.get();


  console.log("交易哈希："+receipt.transactionHash);

  console.log("接口调用后读取接口返回:"+geta);

 

})()
