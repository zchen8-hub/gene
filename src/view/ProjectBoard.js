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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import InputAdornment from '@material-ui/core/InputAdornment';

import Transaction from './Transaction';
import transactionApi from '../api/transaction';
import groupApi from '../api/group';
import projectApi from '../api/project';
import TagApi from '../api/tag';

class ProjectBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.match.params.projectId,
            userId: props.location.state.userId,
            project: {},
            projectMembers: [],
            groupList: [],
            tagList: [],
            onAddingGroup: false,
            inviteCode: '',
            onFocusingTitleId: "",
            onFocusingTitleValue: "",
            groupTitleBtn: null,
            inviCodeDialogToggle: false,
            addTagValue: ""
        };
    }

    componentDidMount() {
        projectApi.getProject(this.state.userId, this.state.projectId, (response) => {
            console.log(response.data);
            this.setState({
                project: response.data,
                projectMembers: response.data.userDTOs,
                groupList: response.data.groupDTOS
            }, () => {
                console.log("user id: " + this.state.userId);
                console.log(this.state);
            });
        })
        TagApi.listAllTags(this.state.projectId, (response) => {
            this.setState({
                tagList: response.data
            }, () => {
                console.log("taglist");
                console.log(this.state.tagList);
            })
        })
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
        if (this.state.userId === this.state.project.createrId) {
            groupApi.deleteGroup(this.state.projectId, groupId, (response) => {
                if (response.code === "200") {
                    console.log("success");
                    let newGroupList = this.state.groupList.filter((group) => group.groupId !== groupId);
                    this.setState({ groupList: newGroupList });
                }
            })
        }
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
        if (this.state.userId === this.state.project.createrId) {
            transactionApi.deleteTransaction(groupId, transactionId, (response) => {
                window.location.reload(true);
            })
        }
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

    handleInviCodeDialogToggle() {
        this.setState({
            inviCodeDialogToggle: !this.state.inviCodeDialogToggle
        })
    }

    generateInviteCode() {
        projectApi.createInviteCode(this.state.userId, this.state.projectId, (response) => {
            this.setState({ inviteCode: response.msg });
        })
    }

    handleCreateTag() {
        console.log("handleCreateTag");
        if (this.state.addTagValue) {
            TagApi.createTag(this.state.userId, this.state.projectId, { tagName: this.state.addTagValue },
                (response) => {
                    this.setState({
                        addTagValue: ""
                    });
                    window.location.reload(true);
                }
            )
        }
    }

    handleDeleteTag(tagId) {
        TagApi.deleteTag(this.state.userId, this.state.projectId, tagId, (response) => {
            alert(response.msg);
            window.location.reload(true);
        })
    }

    render() {

        return (
            <div className="root" >
                <AppBar position="static">
                    <Toolbar >
                        {/* <IconButton edge="start"
                            className="menuButton"
                            color="inherit"
                            aria-label="menu" >
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant="h6"
                            className="title" > {this.props.location.state.projectName}
                        </Typography>
                        <Button color="inherit" > Logout </Button>
                    </Toolbar>
                </AppBar>
                <Typography variant="h4" className="childOfRoot">
                    Project Board
                </Typography>
                <Grid container spacing={2} className="childOfRoot" alignItems="center" style={{ paddingTop: '8px' }}>
                    <Grid item>
                        <AvatarGroup>
                            {
                                this.state.projectMembers.map((user) =>
                                    <Tooltip title={user.username} key={user.uid}>
                                        {/* user.username.split(' ') */}
                                        <Avatar>{user.username.split(' ').reduce((acc, cur) => { return acc.slice(0, 1) + cur.slice(0, 1) }, "")}</Avatar>
                                    </Tooltip>
                                )
                            }
                        </AvatarGroup>
                    </Grid>
                    <Grid item >
                        <Tooltip title="Add Member">
                            <Button onClick={() => this.handleInviCodeDialogToggle()}>
                                <Avatar><PersonAddIcon /></Avatar>
                            </Button>
                        </Tooltip>
                        <Dialog
                            open={this.state.inviCodeDialogToggle}
                            onClose={() => this.handleInviCodeDialogToggle()}
                            aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Generate Invitation Code</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Invite your teammates by invitation code!
                                </DialogContentText>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    value={this.state.inviteCode}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.handleInviCodeDialogToggle()} color="primary">
                                    Cancel
                                    </Button>
                                <Button onClick={() => this.generateInviteCode()} color="primary">
                                    Generate
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="standard-basic"
                            label="Enter Tag"
                            value={this.state.addTagValue}
                            onChange={(event) => this.setState({ addTagValue: event.target.value })} />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.handleCreateTag()}
                        >
                            Add Tag
                        </Button>
                    </Grid>
                    <Grid item>
                        <Paper
                            component="ul"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                padding: '4px',
                                margin: 0,
                            }}>
                            {this.state.tagList.map((data) => {
                                return (
                                    <li key={data.tagId}>
                                        <Chip
                                            label={data.tagName}
                                            onDelete={() => this.handleDeleteTag(data.tagId)}
                                            style={{ margin: '4px', }}
                                        />
                                    </li>
                                );
                            })}
                        </Paper>
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
                                    {
                                        this.state.userId === this.state.project.createrId ?
                                            <IconButton
                                                aria-label="delete"
                                                style={{ marginLeft: 'auto', paddingTop: '0px' }}
                                                onClick={() => this.deleteGroup(group.groupId)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            :
                                            null
                                    }
                                </CardContent>
                                <CardContent style={{ paddingTop: '0px', paddingBottom: '8px' }} >
                                    {
                                        group.transactions != null ?
                                            group.transactions.map((transaction, index) =>
                                                <Transaction
                                                    key={transaction.transactionId}
                                                    userId={this.state.userId}
                                                    projectCreatorId={this.state.project.createrId}
                                                    transaction={transaction}
                                                    projectMembers={this.state.projectMembers}
                                                    tags={this.state.tagList}
                                                    actionDelete={this.deleteTransaction}
                                                    actionUpdate={this.updateTransaction}
                                                />
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