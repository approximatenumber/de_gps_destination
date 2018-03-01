// Init libs
var ROSLIB = require('roslib');
var Helpers = require('../helpers');
// Solidity message definition
var bytecode = '0x6060604081815280608e833960a09052516080516000805461ffff191690921765ffffffff0000191662010000909102178155604f908190603f90396000f3606060405260e060020a600035046313faede68114602457806390797634146039575b005b604560005463ffffffff620100009091041681565b604560005461ffff1681565b6060908152602090f3';
var abi =[{"constant":true,"inputs":[],"name":"cost","outputs":[{"name":"","type":"uint32"}],"type":"function"},{"constant":true,"inputs":[],"name":"ident","outputs":[{"name":"","type":"uint16"}],"type":"function"},{"inputs":[{"name":"_ident","type":"uint16"},{"name":"_cost","type":"uint32"}],"type":"constructor"}];
// JSON message converter
function eth2json(address, web3) {
    var msg = Helpers.getContract(abi, address, web3);
    return {
        // Message fields START
        ident: parseInt(msg.ident()),
        cost: parseInt(msg.cost())
        // Message fields END
    }
}
// Setup exports
module.exports = {
/*
 * This message converter should be autogenerated from
 * ROS message definition language.
 * TODO: converter implementation.
 */
    abi: abi,
    eth2json: eth2json,
    eth2ros: function(address, web3) {return new ROSLIB.Message(eth2json(address, web3))},
    ros2eth: function(msg, web3, fun) {
    var cost = parseInt(msg.cost / 1000000);
    var ident = parseInt(msg.ident);
    var args = [ident, cost];
    Helpers.newContract(abi, bytecode, web3, args, fun);
}
}
