import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import SignIn from './view/SignIn';
import SignUp from './view/SignUp';
import ProjectList from './view/ProjectList';
import ProjectBoard from './view/ProjectBoard';
import Transaction from './view/Transaction';

function App() {
    return (
        <Router >
            <Switch >
                <Route path="/SignUp"
                    exact component={SignUp} >
                    <SignUp />
                </Route> 
                <Route path="/ProjectList/:userId"
                    component={ProjectList} >
                    <ProjectList />
                </Route> 
                <Route path="/ProjectBoard"
                    exact component={ProjectBoard}>
                    <ProjectBoard />
                </Route>

                <Route path="/Transaction"
                    exact component={Transaction}>
                    <Transaction />
                </Route>

                <Route path="/"
                    exact component={SignIn} >
                    <SignIn />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;