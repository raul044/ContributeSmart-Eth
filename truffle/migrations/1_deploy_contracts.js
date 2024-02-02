const SmartContribute = artifacts.require("./SmartContribute.sol")

module.exports = function(deployer) {
  deployer.deploy(SmartContribute);
};
