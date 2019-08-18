import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Route} from 'react-router-dom';
import Login from './Login';
import Login2 from './Login2';
import Orgs from './Orgs';
import ProdMgmt from './comp/proforg/ProdMgmt';
import DrawerMenu from './comp/shared/DrawerMenu';
import MaterialTableDemo from './exper/mtable';
// import Orgs from './Orgs';
// import TmpList from './tmp/TmpList';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <div className="App">
      {/* <CssBaseline /> */}
      <h2>Hello world!</h2>
      <DrawerMenu title='Hello' welcomeMsg='welcome' />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div className="App-content">
        <Route  path="/login" component={Login} />
        <Route  path="/login2" component={Login2} />
        <Route  path="/orgs" component={Orgs} />
        <Route path="/prod-mgmt" component={ProdMgmt} />
        <Route  path="/mtable" component={MaterialTableDemo} />
      </div>
      {/* 
      <Route  path="/tmplist" component={TmpList} /> */}
    </div>
  );
}

export default App;
