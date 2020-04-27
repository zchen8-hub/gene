import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './css/Project.css';
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Transaction from './Transaction';


class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return ( <
            div className = "root" >
            <
            AppBar position = "static" >
            <
            Toolbar >
            <
            IconButton edge = "start"
            className = "menuButton"
            color = "inherit"
            aria - label = "menu" >
            <
            MenuIcon / >
            <
            /IconButton> <
            Typography variant = "h6"
            className = "title" >
            (
                default project) <
            /Typography> <
            Button color = "inherit" > Login < /Button> <
            /Toolbar> <
            /AppBar> <
            Container >
            <
            Card className = "column" >
            <
            CardHeader >

            <
            /CardHeader> <
            CardContent >
            <
            Transaction / >
            <
            Transaction / >
            <
            Transaction / >
            <
            Transaction / >
            <
            Transaction / >
            <
            /CardContent> <
            CardActions >

            <
            /CardActions> <
            /Card> <
            Card className = "column" >
            <
            CardHeader >

            <
            /CardHeader> <
            CardContent >
            <
            Transaction / >
            <
            Transaction / >
            <
            Transaction / >
            <
            Transaction / >
            <
            Transaction / >
            <
            /CardContent> <
            CardActions >

            <
            /CardActions> <
            /Card> <
            /Container> <
            /div>
        )
    }
}

export default withRouter(Project);