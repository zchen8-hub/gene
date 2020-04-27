import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import SignIn from './view/SignIn';
import SignUp from './view/SignUp';
import ProjectList from './view/ProjectList';
import Project from './view/Project';

function App() {
    return (
        <Switch >
            <Route path="/SignUp" >
                <SignUp />
            </Route>
            <Route path="/ProjectList/:userId"
                render={props => <ProjectList {...props} key={this.props.location.key}/>}>
            </Route>

            <Route path="/Project">
                <Project />
            </Route>

            <Route path="/" >
                <SignIn />
            </Route>
        </Switch>
    );
}

export default App;