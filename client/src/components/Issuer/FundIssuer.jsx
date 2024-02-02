import { useState } from "react";


function FundIssuer({
  contract,
  accounts,
  web3,
  issuerID,
  setIssuerID,
  funds,
  getIssuerFunds
}) {
  const [ethAmount, setEthAmount] = useState(0);

  const fundIssuer = async () => {
    await contract.methods.fundIssuer(issuerID).send({ from: accounts[0], value: web3.utils.toWei(ethAmount) });;
    getIssuerFunds();
  };

  return (
    <div>
      <label>
        Enter a ETH amount:
        <input
          type="number"
          value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)}
        />
      </label>
      <button onClick={fundIssuer}>Fund me</button>
    </div>
  );
}

export default FundIssuer;
