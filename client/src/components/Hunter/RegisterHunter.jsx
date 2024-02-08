function RegisterHunter({
  contract,
  accounts,
  hunterID,
  setHunterID,
}) {

  const registerHunter = async () => {
    await contract.methods.registerHunter(hunterID).send({ from: accounts[0] });
  };

  return (
    <div>
      <label>
        Enter a Hunter ID:
        <input
          type="text"
          value={hunterID}
          onChange={(e) => setHunterID(e.target.value)}
        />
      </label>
      <button onClick={registerHunter}>Register Hunter</button>
    </div>
  );
}

export default RegisterHunter;
