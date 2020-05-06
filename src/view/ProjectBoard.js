import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import './css/ProjectBoard.css';
import { Card, CardContent, CardActions, Grid } from '@material-ui/core';
import Transaction from './Transaction';

import transactionApi from '../api/transaction'
import groupApi from '../api/group'
import { withRouter } from "react-router-dom";

class ProjectBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: props.location.state.userId,
            groupList: [],
            tagList: []
        }
    }

    componentDidMount() {
        //console.log("user id: " + this.state.userId);

        groupApi.listAllGroups(this.props.match.params.projectId, (response) => {
            this.setState({ groupList: response.data.reverse() });
            console.log(this.state.groupList);
            //console.log("List Groups Response: " + response.data);
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

    addTransaction(groupId, creatorId) {
        transactionApi.createTransaction(
            groupId,
            {
                title: "new transaction",
                description: "",
                creatorId: creatorId
            },
            (response) => {
                //console.log(response);
                if (response.code === "200") {
                    let newGroupList = this.state.groupList;
                    //console.log(newGroupList);
                    newGroupList.find(group => group.groupId === groupId).transactions.push(response.data);
                    //console.log(newGroupList);
                    this.setState({ groupList: newGroupList });
                } else {
                    alert("Failed: " + response.message);
                }
            })
    }

    deleteTransaction(groupId, transactionId) {
        transactionApi.deleteTransaction(groupId, transactionId, (response) => {
            window.location.reload(true);
        })
    }

    render() {
        let onAddingGroup = false;

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
                <Grid container spacing={3} style={{padding: '24px'}}>
                    {this.state.groupList.map((group, index) =>
                        <Grid item style={{width: '400px'}}>
                            <Card key={group.groupId} style={{ backgroundColor: "#F4F5F7" }} >
                                <CardContent style={{ paddingBottom: '0'}}>
                                    <Button > {group.groupName} </Button>
                                </CardContent>
                                <CardContent style={{ paddingTop: '0' }} >
                                    {
                                        group.transactions != null ?
                                            group.transactions.map((transaction, index) =>
                                                <Transaction key={transaction.transactionId} transaction={transaction} actionDelete={this.deleteTransaction} />
                                            )
                                            :
                                            <div>{console.log(group)}</div>
                                    }
                                </CardContent>
                                <CardActions style={{ paddingLeft: '16px', paddingRight: '16px' }} >
                                    <Button
                                        startIcon={<AddIcon fontSize="large" />}
                                        disableElevation={true}
                                        onClick={() => this.addTransaction(group.groupId, this.state.userId)}
                                    >
                                        Create New Transaction
                                </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )}
                    <Grid item >
                        {
                            onAddingGroup ? 
                                123
                                :
                                <Button style={{ backgroundColor: "#F4F5F7" }}><AddIcon fontSize="large" /></Button>
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }
};

export default withRouter(ProjectBoard);