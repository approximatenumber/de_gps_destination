var GPSDestination = artifacts.require("./GPSDestination.sol");

module.exports = function(deployer) {
  deployer.deploy(GPSDestination);
};
