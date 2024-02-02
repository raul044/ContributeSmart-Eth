function ClaimIssuer({
  contract,
  accounts,
  web3,
  issuerID,
  setIssuerID,
  funds,
  getIssuerFunds
}) {

  const claimFunds = async () => {
    await contract.methods.claimFund(issuerID).send({ from: accounts[0] });;
    getIssuerFunds();
  };


  return (
    <div>
      <button onClick={claimFunds}>Claim Funds</button>
    </div>
  );
}

export default ClaimIssuer;
