function GetIssuer({
  contract,
  accounts,
  web3,
  issuerID,
  setIssuerID,
  funds,
  getIssuerFunds
}) {

  return (
    <div>
      <label>
        Enter a Issuer ID:
        <input
          type="text"
          value={issuerID}
          onChange={(e) => setIssuerID(e.target.value)}
        />
      </label>
      <button onClick={getIssuerFunds}>Fetch</button>
      <p>Funds: {funds}</p>
    </div>
  );
}

export default GetIssuer;
