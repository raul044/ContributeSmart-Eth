const SmartContribute = artifacts.require('./contracts/SmartContribute.sol');
const Web3 = require('web3');
const web3 = new Web3();

const githubUser = process.env.GITHUB_USER
const issueId = process.env.GITHUB_ISSUE_HREF
const bounty = process.env.GITHUB_ISSUE_BOUNTY

module.exports = async function (callback) {
  try {
    // Change to remote
    const smartContribute = await SmartContribute.deployed();

    const bountyWei = web3.utils.toWei(bounty, 'ether');
    const ethBounty = web3.utils.toBN(bountyWei);
    console.log('Bounty:', ethBounty.toString());

    const result = await smartContribute.registerIssue(issueId, githubUser, ethBounty.toString());
    console.log('Register Issue Result:', result);
    callback();
  } catch (error) {
    console.error('Error:', error);
    callback(error);
  }
};
