import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import NoticeNoArtifact from "../utils/NoticeNoArtifact";
import NoticeWrongNetwork from "../utils/NoticeWrongNetwork";
import GetIssuer from "./GetIssuer";
import FundIssuer from "./FundIssuer";
import ClaimIssuer from "./ClaimFund";
import BountyActions from "./BountyActions";


function Issuer() {
  const { state } = useEth();
  const [issuerID, setIssuerID] = useState('');
  const [funds, setFunds] = useState(null);

  const getIssuerFunds = async () => {
    const result = await state.contract.methods.issuerFunds(issuerID).call({ from: state.accounts[0] });;
    setFunds(isNaN(result) ? 'Invalid output' : state.web3.utils.fromWei(result));
  };

  const issuerProps = {
    contract: state.contract,
    accounts: state.accounts,
    web3: state.web3,
    issuerID,
    setIssuerID,
    funds,
    getIssuerFunds
  }

  const issuerActions =
    <>
      <GetIssuer
        {...issuerProps}
      />
      <FundIssuer
        {...issuerProps}
      />
      <BountyActions
        {...issuerProps}
      />
      <ClaimIssuer
        {...issuerProps}
      />
    </>;

  return (
    <div className="demo">
      <Title />
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            issuerActions
      }
    </div>
  );
}

export default Issuer;
