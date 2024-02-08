function GetBounty({
  bountyID,
  setBountyID,
  bounty,
  getBounty
}) {

  return (
    <div>
      <label>
        Enter a Bounty ID:
        <input
          type="text"
          value={bountyID}
          onChange={(e) => setBountyID(e.target.value)}
        />
      </label>
      <button onClick={getBounty}>Fetch</button>
      <p>Bounty: {bounty}</p>
    </div>
  );
}

export default GetBounty;
