import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import Issuer from "./components/Issuer";
import Hunter from "./components/Hunter";
import Bounties from "./components/Bounties";
import './styles.css'; // make sure to import the CSS file

function App() {
  return (
    <EthProvider>
      <div id="App">
        <Intro />
        <div className="container">
          <div className="component-box Issuer">
            <Issuer />
          </div>
          <div className="component-box Hunter">
            <Hunter />
          </div>
          <div className="component-box Bounties">
            <Bounties />
          </div>
          <div className="component-box Demo">
            <Demo />
          </div>
        </div>
        <Footer />
      </div>
    </EthProvider>
  );
}

export default App;
