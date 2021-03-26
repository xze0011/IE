import Layout from './component/layout/layout';
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Maps from './pages/map/map';
import Guide from './pages/guide';
import Attration from './pages/attraction';
import CarparkPermit from './pages/subpages/carparkPermit';
import MelPolicy from './pages/subpages/melPolicy';
import WheerchairCharge from './pages/subpages/wheerchairCharge';

function App() {
  return (
    <div className="App">
      <Router>
         <Layout />
          <Switch>
            <Route path='/'  exact component={Home} />
            <Route path='/map' component={Maps} />
            <Route path='/guide' component={Guide} />
            <Route path='/attraction' component={Attration} />
            <Route path='/carparkpermit'  component={CarparkPermit} />
            <Route path='/wheerchaircharge' component={WheerchairCharge} />
            <Route path='/melpolicy' component={MelPolicy} />
          </Switch>
      </Router>
    </div>

    
  );
}

export default App;
