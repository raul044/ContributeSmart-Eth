// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartContribute {
    // TODO: Add arrays to view in Ganache. Hash keys cannot be retrieved in UI
    address public minter;
    mapping(string => address) private issuerWallets;
    mapping(string => uint256) public issuerFunds;
    mapping(string => address) private hunterWallets;
    mapping(string => uint256) public issueBounties;

    event FundsAdded(address indexed by, uint256 amount);
    event FundsRetracted(address indexed by, uint256 amount);

    constructor() {
        minter = msg.sender;
    }

    function fundIssuer(string memory gitId) external payable {
        // Save issuer wallet
        address caller = msg.sender;
        issuerWallets[gitId] = caller;

        require(msg.value > 0, "Registration fee is incorrect; please check and try again");

        // Check if issuer already exists
        uint256 paymentAmount = msg.value;
        if (issuerFunds[gitId] > 0) {
            paymentAmount += issuerFunds[gitId];
        }
        
        issuerFunds[gitId] = paymentAmount;

        emit FundsAdded(address(this), msg.value);
    }

    function registerIssue(string memory issueId, string memory gitId, uint256 bounty) external {
        require(issuerFunds[gitId] > 0, "Missing available fund");
        require(issuerFunds[gitId] >= bounty, "Not enough funds!");

        issuerFunds[gitId] -= bounty;

        if (issueBounties[issueId] > 0) {
            bounty += issueBounties[issueId];
        }

        issueBounties[issueId] = bounty;
    }

    function cancelBounty(string memory issueId, string memory gitId) external {
        require(issueBounties[issueId] > 0, "No funds in issue bounty");
        require(issuerWallets[gitId] != address(0), "Issuer does not have a wallet");

        issuerFunds[gitId] += issueBounties[issueId];
        issueBounties[issueId] = 0;
    }

    function registerHunter(string memory gitId) external {
        address caller = msg.sender;
        hunterWallets[gitId] = caller;
    }

    function claimBounty(string memory issueId, string memory hunterGitId) external {
        address hunter = hunterWallets[hunterGitId];
        uint256 bounty = issueBounties[issueId];

        require(hunter != address(0) && bounty > 0, "Missing claiming wallet or bounty");
        
        payable(hunter).transfer(bounty);

        issueBounties[issueId] = 0;

        emit FundsRetracted(hunter, bounty);
    }

    function claimFund(string memory gitId) external {
        address wallet = issuerWallets[gitId];
        require(wallet != address(0), "Missing claiming wallet");

        uint256 availableFund = issuerFunds[gitId];
        require(availableFund > 0, "Missing available fund");

        payable(wallet).transfer(availableFund);
        
        issuerFunds[gitId] = 0;

        emit FundsRetracted(wallet, availableFund);
    }

    function terminate() public {
        require(msg.sender == minter, "Only the minter can terminate the contract!");
        selfdestruct(payable(minter));
    }
}
