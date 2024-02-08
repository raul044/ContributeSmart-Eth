// ContributeTest.js
const SmartContribute = artifacts.require('./SmartContribute.sol');
const assert = require('assert');

contract('SmartContribute', (accounts) => {
  let contribute;

  beforeEach(async () => {
    contribute = await SmartContribute.new();
  });

  it('should allow funding an issuer and registering an issue', async () => {
    const issuerGitId = 'issuer123';
    const issueId = 'issue789';
    const bounty = web3.utils.toWei('1', 'ether');

    // Fund the issuer
    await contribute.fundIssuer(issuerGitId, { value: bounty, from: accounts[0] });

    // Register the issue
    await contribute.registerIssue(issueId, issuerGitId, bounty);

    // Verify issuer funds and issue bounties
    const issuerFund = await contribute.issuerFunds(issuerGitId);
    const issueBounty = await contribute.issueBounties(issueId);

    assert.strictEqual(issuerFund.toString(), '0', 'Issuer fund should be depleted');
    assert.strictEqual(issueBounty.toString(), bounty, 'Issue bounty should match the funded amount');
  });

  it('should allow a hunter to claim a bounty', async () => {
    const issuerGitId = 'issuer123';
    const hunterGitId = 'hunter456';
    const issueId = 'issue789';
    const bounty = web3.utils.toWei('1', 'ether');

    // Fund the issuer
    await contribute.fundIssuer(issuerGitId, { value: bounty, from: accounts[0] });

    // Register the issue
    await contribute.registerIssue(issueId, issuerGitId, bounty);

    // Register the hunter
    await contribute.registerHunter(hunterGitId);

    // Hunter claims the bounty
    await contribute.claimBounty(issueId, hunterGitId);

    // Verify the hunter's balance
    const hunterBalance = await web3.eth.getBalance(accounts[0]); // assuming accounts[0] is the hunter's account
    assert.notStrictEqual(hunterBalance.toString(), '0', 'Hunter balance should be greater than 0');
  });

});
