// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title SmartContribute: A contract for managing funds and bounties for open source contributions
contract SmartContribute {
    /// @notice The address of the contract deployer, also known as the minter
    address public minter;
    /// @notice Mapping of GitHub IDs to issuer wallet addresses
    mapping(string => address) private issuerWallets;
    /// @notice Mapping of GitHub IDs to available funds for issuers
    mapping(string => uint256) public issuerFunds;
    /// @notice Mapping of GitHub IDs to hunter wallet addresses
    mapping(string => address) private hunterWallets;
    /// @notice Mapping of issue IDs to available bounties
    mapping(string => uint256) public issueBounties;

    /// @notice Event emitted when funds are added to the contract
    event FundsAdded(address indexed by, uint256 amount);
    /// @notice Event emitted when funds are retracted from the contract
    event FundsRetracted(address indexed by, uint256 amount);

    /// @dev Constructor function initializes the contract with the address of the deployer
    constructor() {
        minter = msg.sender;
    }
    
    /// @notice Allows an issuer to fund their account with ETH or register upon first call
    /// @param gitId The GitHub ID of the issuer
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

    /// @notice Registers an issue and allocates a bounty to it (or adds to the existing)
    /// @param issueId The unique identifier of the issue
    /// @param gitId The GitHub ID of the issuer associated with the issue
    /// @param bounty The bounty amount to be allocated to the issue using Wei as unit
    function registerIssue(string memory issueId, string memory gitId, uint256 bounty) external {
        require(issuerFunds[gitId] > 0, "Missing available fund");
        require(issuerFunds[gitId] >= bounty, "Not enough funds!");

        issuerFunds[gitId] -= bounty;

        if (issueBounties[issueId] > 0) {
            bounty += issueBounties[issueId];
        }

        issueBounties[issueId] = bounty;
    }

    /// @notice Cancels a bounty associated with a specific issue and returns the fund to the issuer
    /// @param issueId The unique identifier of the issue
    /// @param gitId The GitHub ID of the issuer associated with the issue
    function cancelBounty(string memory issueId, string memory gitId) external {
        require(issueBounties[issueId] > 0, "No funds in issue bounty");
        require(issuerWallets[gitId] != address(0), "Issuer does not have a wallet");

        issuerFunds[gitId] += issueBounties[issueId];
        issueBounties[issueId] = 0;
    }

    /// @notice Registers a hunter by storing their wallet address
    /// @param gitId The GitHub ID of the hunter
    function registerHunter(string memory gitId) external {
        address caller = msg.sender;
        hunterWallets[gitId] = caller;
    }

    /// @notice Allows a hunter to claim the bounty for a specific issue
    /// @param issueId The unique identifier of the issue
    /// @param hunterGitId The GitHub ID of the hunter claiming the bounty
    function claimBounty(string memory issueId, string memory hunterGitId) external {
        address hunter = hunterWallets[hunterGitId];
        uint256 bounty = issueBounties[issueId];

        require(hunter != address(0) && bounty > 0, "Missing claiming wallet or bounty");
        
        payable(hunter).transfer(bounty);

        issueBounties[issueId] = 0;

        emit FundsRetracted(hunter, bounty);
    }

    /// @notice Allows an issuer to claim their available funds
    /// @param gitId The GitHub ID of the issuer
    function claimFund(string memory gitId) external {
        address wallet = issuerWallets[gitId];
        require(wallet != address(0), "Missing claiming wallet");

        uint256 availableFund = issuerFunds[gitId];
        require(availableFund > 0, "Missing available fund");

        payable(wallet).transfer(availableFund);
        
        issuerFunds[gitId] = 0;

        emit FundsRetracted(wallet, availableFund);
    }

    /// @dev Terminates the contract and sends remaining funds to the minter
    function terminate() public {
        require(msg.sender == minter, "Only the minter can terminate the contract!");
        selfdestruct(payable(minter));
    }
}
