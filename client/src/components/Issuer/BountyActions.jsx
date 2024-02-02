import { useState } from "react";


function BountyActions({
  contract,
  accounts,
  web3,
  issuerID,
  setIssuerID,
  funds,
  getIssuerFunds
}) {
  const [issueID, setIssueID] = useState("");
  const [bounty, setBounty] = useState(0);

  const openBounty = async () => {

    if (funds < bounty || bounty === 0) {
      // TODO: Add some error 
    }

    await contract.methods.registerIssue(issueID, issuerID, web3.utils.toWei(bounty)).send({ from: accounts[0] });
    getIssuerFunds();
  };

  const cancelBounty = async () => {
    if (issueID === "") {
      // TODO: Add some error 
    }

    await contract.methods.cancelBounty(issueID, issuerID).send({ from: accounts[0] });
    getIssuerFunds()
  };

  return (
    <div>
      <label>
        Enter a Issue ID:
        <input
          type="text"
          value={issueID}
          onChange={(e) => setIssueID(e.target.value)}
        />
      </label>
      <label>
        Enter a ETH bounty:
        <input
          type="number"
          value={bounty}
          onChange={(e) => setBounty(e.target.value)}
        />
      </label>
      <button onClick={openBounty}>Open Bounty</button>
      <button onClick={cancelBounty}>Cancel Bounty</button>
    </div>
  );
}

export default BountyActions;
