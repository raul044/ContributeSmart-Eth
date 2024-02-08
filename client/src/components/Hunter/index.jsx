import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import NoticeNoArtifact from "../utils/NoticeNoArtifact";
import NoticeWrongNetwork from "../utils/NoticeWrongNetwork";
import RegisterHunter from "./RegisterHunter";


function Hunter() {
  const { state } = useEth();
  const [hunterID, setHunterID] = useState('');

  const issuerProps = {
    contract: state.contract,
    accounts: state.accounts,
    hunterID,
    setHunterID,
  }

  const hunterActions =
    <>
      <RegisterHunter
        {...issuerProps}
      />
    </>;

  return (
    <div className="demo">
      <Title />
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            hunterActions
      }
    </div>
  );
}

export default Hunter;
