import Layout from './component/layout/layout';
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Maps from './pages/map';
import Guide from './pages/guide';
import Attration from './pages/attraction';

function App() {
  return (
    <div className="App">
      <Router>
         <Layout />
         <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/map' component={Maps} />
          <Route path='/guide' component={Guide} />
          <Route path='/attraction' component={Attration} />
        </Switch>
      </Router>
    </div>

    
  );
}

export default App;
