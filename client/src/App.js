import React from 'react';
import {BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import { useState} from 'react';
import Home from './Home';
import Login from './Login';
import Result from './result';
import AddPat from './addPat';
import doctorpage from './doctorpage';
import AdminPage2 from  './adminPage2';
import NavBar from './NavBar';
import Footer from './footer';
import Hospital from './hospital';
import './App.css'
import Instruction from './instruction'
import ChangePassword from './ChangePassword'

import ChartComponent from './charts-component';


//<link href="https://fonts.googleapis.com/css?family=Titillium+Web:300,400,700" rel="stylesheet"></link>
function App(){ 

  const [statenum, setStatenum ] = useState(1);

  const forceUpdateFunction = (function() {
    setStatenum(statenum+1);
  });

  return (
    <Router>
      <NavBar updateForcer={forceUpdateFunction}></NavBar>
      <div className="navbar-navroot-margin-fix"></div>
      <Switch>
        <Route exact component={Home} path="/"/>
        <Route exact component={Home} path="/home"/>
        <Route exact path="/login" render={
          (props)=> <Login {...props} updateForcer={forceUpdateFunction} />
        }/>
        <Route exact component={AdminPage2} path="/adminPage2"/>
        <Route exact component={Result} path="/result"/>
        <Route exact component={Instruction} path="/Instruction"/>
        <Route exact component={AddPat} path="/AddPat"/>
        <Route exact component={doctorpage} path="/doctorpage"/>
        <Route exact component={Hospital} path="/hospital"/>
        <Route exact component={ChartComponent} path="/chart" />
        <Route exact component={ChangePassword} path="/changepass" />
      </Switch>
    </Router> 
  )
}

export default App;