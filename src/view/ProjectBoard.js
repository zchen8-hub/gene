import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './css/ProjectBoard.css';
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Transaction from './Transaction';
import { withRouter } from "react-router-dom";

import transactionApi from '../api/transaction'
import groupApi from '../api/group'

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        const projectId = this.props.match.params.projectId;
        debugger;
        groupApi.listAllGroups(projectId,(response)=>{

        })
        transactionApi.listAllTransaction()
    }
    render() {
        return (
            <div className="root">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className="title">
                            {this.props.location.state.projectName}
                        </Typography>
                        <Button color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
                <Container className="container" style={{display: 'flex'}}>
                    <Card className="column">
                        <CardHeader>

                        <CardContent>
                            <Transaction />
                        </CardContent>
                        <CardActions>

                        </CardActions>
                    </Card>
                    <Card className="column">
                        <CardHeader>

                        </CardHeader>
                        <CardContent>
                            <Transaction />
                            <Transaction />
                            <Transaction />
                            <Transaction />
                            <Transaction />
                        </CardContent>
                        <CardActions>

                        </CardActions>
                    </Card>
                </Container>
            </div>
        )
    }
};

export default withRouter(Project);