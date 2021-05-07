import Layout from "./component/layout/layout";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Maps from "./pages/map/map";
import Guide from "./pages/guide";
import Attration from "./pages/attraction";
import CarparkPermit from "./pages/subpages/carparkPermit";
import MelPolicy from "./pages/subpages/melPolicy";
import MobilityAid from "./pages/subpages/mobilityAid";
import Airport from "./pages/subpages/airportService";
import TrailRider from "./pages/subpages/trailRider";
import About from "./pages/about";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import IndiAttaction from "./pages/subpages/individualAttraction";
import Checklist from "./pages/subpages/checklist";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/map" component={Maps} />
          <Route path="/guide" component={Guide} />
          <Route path="/attraction/:id" component={Attration} />
          <Route path="/carparkpermit" component={CarparkPermit} />
          <Route path="/mobilityAid" component={MobilityAid} />
          <Route path="/melpolicy" component={MelPolicy} />
          <Route path="/airportService" component={Airport} />
          <Route path="/trailRider" component={TrailRider} />
          <Route path="/about" component={About} />
          <Route path="/individualAttraction" component={IndiAttaction} />
          <Route path="/checklist" component={Checklist} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
