import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import Issuer from "./components/Issuer";
import Hunter from "./components/Hunter";
import Bounties from "./components/Bounties";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Intro />
          <hr />
          <Issuer />
          <hr />
          <Hunter />
          <hr />
          <Bounties />
          <hr />
          <Demo />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
