import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './css/ProjectBoard.css';
import { Card, CardContent, CardActions } from '@material-ui/core';
import Transaction from './Transaction';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

import transactionApi from '../api/transaction'
import groupApi from '../api/group'
import { withRouter } from "react-router-dom";

class ProjectBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupList: [],
            tagList: []
        }
    }

    componentDidMount() {

        groupApi.listAllGroups(this.props.match.params.projectId, (response) => {
            this.setState({ groupList: response.data });
            console.log(this.state.groupList);
        })

        /*groupList.forEach(group => {
            transactionApi.listAllTransaction(group.groupId,(response)=>{
                group.transactionList = response.data;
            })
        });*/
    }

    addGroup(projectId, groupname) {
        const group = {
            "groupName": groupname
        }
        groupApi.createGroup(projectId, group, (response) => {
            window.location.reload(true);
        })
    }

    deleteGroup(projectId, groupId) {
        groupApi.deleteGroup(projectId, groupId, (response) => {
            window.location.reload(true);
            console.log("success");
        })
    }

    addTransaction(groupId, transaction) {
        transactionApi.createTransaction(groupId, transaction, (response) => {
            window.location.reload(true);
        })
    }

    deleteTransaction(groupId, transaction) {
        transactionApi.deleteTransaction(groupId, transaction, (response) => {
            window.location.reload(true);
        })
    }

    render() {
        return (
            <div className="root" >
                <AppBar position="static" >
                    <Toolbar >
                        <IconButton edge="start"
                            className="menuButton"
                            color="inherit"
                            aria-label="menu" >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6"
                            className="title" > {this.props.location.state.projectName}
                        </Typography>
                        <Button color="inherit" > Logout </Button>
                    </Toolbar>
                </AppBar>
                <div className="container" style={{ display: 'flex' }} >
                    {this.state.groupList.map((group) =>
                        <Card className="column" style={{ backgroundColor: "#F4F5F7" }} >
                            <CardContent style={{ paddingBottom: '0' }}>
                                <Button > {group.groupName} </Button>
                            </CardContent>
                            <CardContent style={{ paddingTop: '0' }} >
                                < Transaction />
                                <Transaction />
                                <Transaction />
                                <Transaction />
                                <Transaction />
                            </CardContent>
                            <CardActions style={{ paddingLeft: '16px', paddingRight: '16px' }} >
                                <Button variant="contained"
                                    color="inherit"
                                    startIcon={<SubdirectoryArrowRightIcon />}
                                    style={{ backgroundColor: '#F4F5F7' }} >
                                    Create New Transaction
                                </Button>
                            </CardActions>
                        </Card>)
                    }
                </div>
            </div>
        )
    }
};

export default withRouter(ProjectBoard);