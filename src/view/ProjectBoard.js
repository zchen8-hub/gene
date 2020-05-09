import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import './css/ProjectBoard.css';
import { Card, CardContent, CardActions, Grid, TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';

import Transaction from './Transaction';
import transactionApi from '../api/transaction'
import groupApi from '../api/group'

class ProjectBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.match.params.projectId,
            userId: props.location.state.userId,
            groupList: [],
            tagList: [],
            onAddingGroup: false,
            onFocusingTitleId: "",
            onFocusingTitleValue: "",
            groupTitleBtn: null,
        }
    }

    componentDidMount() {
        //console.log("onChangingGroupTitle: " + this.state.onChangingGroupTitle);
        console.log("user id: " + this.state.userId);

        groupApi.listAllGroups(this.state.projectId, (response) => {
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

    addGroup(groupname) {
        const group = {
            "groupName": groupname
        }
        groupApi.createGroup(this.state.projectId, group, (response) => {
            window.location.reload(true);
            this.setState({ onAddingGroup: false });
        })
    }

    deleteGroup(groupId) {
        groupApi.deleteGroup(this.state.projectId, groupId, (response) => {
            if (response.code === "200") {
                console.log("success");
                let newGroupList = this.state.groupList.filter((group) => group.groupId != groupId);
                this.setState({ groupList: newGroupList });
            }
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
                if (response.code === "200") {
                    let newGroupList = this.state.groupList;
                    newGroupList.find(group => group.groupId === groupId).transactions.push(response.data);
                    this.setState({ groupList: newGroupList });
                } else {
                    alert("Failed: " + response.message);
                }
            })
    }

    updateTransaction(groupId, transactionId, transaction) {
        transactionApi.updateTransaction(
            groupId,
            transactionId,
            transaction,
            (response) => {
                if (response.code === "200") {
                    //window.location.reload(true);
                }
            })
    }

    deleteTransaction(groupId, transactionId) {
        transactionApi.deleteTransaction(groupId, transactionId, (response) => {
            window.location.reload(true);
        })
    }

    handleGroupTitleFocused(event, groupId, groupName) {
        this.setState(
            {
                groupTitleBtn: event.currentTarget,
                onFocusingTitleId: groupId,
                onFocusingTitleValue: groupName
            });
        event.currentTarget.style.display = "none";
    }

    handleGroupTitleBlur() {
        console.log(this.state.onFocusingTitleValue);
        groupApi.updateGroupName(
            this.state.projectId,
            this.state.onFocusingTitleId,
            {
                groupName: this.state.onFocusingTitleValue
            },
            (response) => {
                if (response.code === "200") {
                    let newGroupList = this.state.groupList;
                    newGroupList
                        .find(group => group.groupId === response.data.groupId)
                        .groupName = response.data.groupName;
                    console.log(newGroupList);
                    this.setState({
                        groupList: newGroupList
                    })
                }
                let btn = this.state.groupTitleBtn;
                btn.style.display = "inline-flex";
                this.setState({
                    onFocusingTitleId: -1,
                    onFocusingTitleValue: "",
                    groupTitleBtn: null
                });
            }
        )
    }

    render() {
        return (
            <div className="root" >
                <AppBar position="static">
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
                <Typography variant="h4" className="childOfRoot">
                    Project Board
                </Typography>
                <Grid container spacing={0} className="childOfRoot" alignItems="center" style={{ paddingTop: '8px' }}>
                    <Grid item >
                        <AvatarGroup>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                        </AvatarGroup>
                    </Grid>
                    <Grid item >
                        <Tooltip title="Add Member">
                            <Button>
                                <Avatar><PersonAddIcon /></Avatar>
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>

                <Grid container spacing={3} wrap="nowrap" style={{ padding: '24px' }}>
                    {this.state.groupList.map((group, index) =>
                        <Grid item key={group.groupId} style={{ minWidth: '350px' }}>
                            <Card style={{ backgroundColor: "#F4F5F7" }} >
                                <CardContent style={{ paddingBottom: '0', display: 'flex', justify: 'center' }}>
                                    <Button
                                        style={{ padding: '0px', height: '30px' }}
                                        onClick={(e) => this.handleGroupTitleFocused(e, group.groupId, group.groupName)}>
                                        {group.groupName}
                                    </Button>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        autoFocus={true}
                                        value={this.state.onFocusingTitleValue}
                                        style={group.groupId === this.state.onFocusingTitleId ? { display: 'inline-flex' } : { display: 'none' }}
                                        onChange={(event) => this.setState({ onFocusingTitleValue: event.target.value })}
                                        onBlur={() => this.handleGroupTitleBlur()} />
                                    <IconButton
                                        aria-label="delete"
                                        style={{ marginLeft: 'auto', paddingTop: '0px' }}
                                        onClick={() => this.deleteGroup(group.groupId)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardContent>
                                <CardContent style={{ paddingTop: '0px', paddingBottom: '8px' }} >
                                    {
                                        group.transactions != null ?
                                            group.transactions.map((transaction, index) =>
                                                <Transaction
                                                    key={transaction.transactionId}
                                                    userId={this.state.userId}
                                                    transaction={transaction}
                                                    actionDelete={this.deleteTransaction}
                                                    actionUpdate={this.updateTransaction} />
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
                            this.state.onAddingGroup ?
                                this.addGroup("new group")
                                :
                                <Button onClick={() => { this.setState({ onAddingGroup: true }) }} style={{ backgroundColor: "#F4F5F7" }}><AddIcon fontSize="large" /></Button>
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }
};

export default withRouter(ProjectBoard);