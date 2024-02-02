const SmartContribute = artifacts.require('./contracts/SmartContribute.sol');

const githubUser = process.env.GITHUB_USER
const issueId = process.env.GITHUB_ISSUE_HREF

module.exports = async function (callback) {
  try {
    // Change to remote
    const smartContribute = await SmartContribute.deployed();
    const result = await smartContribute.claimBounty(issueId, githubUser);
    console.log('Claim Bounty Result:', result);
    callback();
  } catch (error) {
    console.error('Error:', error);
    callback(error);
  }
};
