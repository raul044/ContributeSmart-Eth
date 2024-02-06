import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import NoticeNoArtifact from "../utils/NoticeNoArtifact";
import NoticeWrongNetwork from "../utils/NoticeWrongNetwork";
import GetBounty from "./GetBounty";

function Bounties() {
  const { state } = useEth();
  const [bountyID, setBountyID] = useState('');
  const [bounty, setBounty] = useState();

  const getBounty = async () => {
    const result = await state.contract.methods.issueBounties(bountyID).call({ from: state.accounts[0] });;
    setBounty(isNaN(result) ? 'Invalid output' : state.web3.utils.fromWei(result));
  };

  const issuerProps = {
    bountyID,
    setBountyID,
    bounty,
    getBounty
  }

  const bountiesActions =
    <>
      <GetBounty
        {...issuerProps}
      />
    </>;

  return (
    <div className="demo">
      <Title />
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            bountiesActions
      }
    </div>
  );
}

export default Bounties;
