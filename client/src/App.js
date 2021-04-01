import React from 'react';
import {BrowserRouter as Router , Switch , Route } from 'react-router-dom';
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
//<link href="https://fonts.googleapis.com/css?family=Titillium+Web:300,400,700" rel="stylesheet"></link>
function App(){ 
  return (
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route exact component={Home} path="/"/>
        <Route exact component={Home} path="/home"/>
        <Route exact component={Login} path="/login"/>
        <Route exact component={AdminPage2} path="/adminPage2"/>
        <Route exact component={Result} path="/result"/>
        <Route exact component={Instruction} path="/Instruction"/>
        <Route exact component={AddPat} path="/AddPat"/>
        <Route exact component={doctorpage} path="/doctorpage"/>
        <Route exact component={Result} path="/result"/>
        <Route exact component={Hospital} path="/hospital"/>
      </Switch>
    </Router> 
  )
}

export default App;