import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
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
        Switch >
        <
        Route path = "/SignUp" >
        <
        SignUp / >
        <
        /Route>

        <
        Route path = "/Project/:userId"
        render = {
            props => < ProjectList {...props }
            key = { this.props.location.key }
            /> }> <
            /Route>

            <
            Route path = "/" >
            <
            SignIn / >
            <
            /Route>

            <
            /Switch>
        );
    }

    export default App;