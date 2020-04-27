import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import SignIn from './view/SignIn';
import SignUp from './view/SignUp';
import ProjectList from './view/ProjectList';

function App() {
    return (
        // <div className="App">
        //   <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //       123Edit <code>src/App.js</code> and save to reload.
        //     </p>
        //     <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>
        //   </header>
        // </div>
        <
        Router >
        <
        Switch >
        <
        Route path = "/SignUp"
        exact component = { SignUp } >
        <
        SignUp / >
        <
        /Route> <
        Route path = "/Project/:userId"
        component = { ProjectList } >
        <
        ProjectList / >
        <
        /Route> <
        Route path = "/"
        exact component = { SignIn } >
        <
        SignIn / >
        <
        /Route> <
        /Switch>

        <
        /Router>
    );
}

export default App;