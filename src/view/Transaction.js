import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActionArea, TextField, InputBase, IconButton } from '@material-ui/core';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import transactionApi from '../api/transaction'
import CommentApi from '../api/comment'
import GroupApi from '../api/group'

import './css/Transaction.css';
import 'semantic-ui-css/semantic.min.css';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        marginBottom: '16px',
        textAlign: 'left',
    },
    description: {
        marginTop: '16px',
        fontSize: 14,
        textAlign: 'left',
    },
    dlalogTitle: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    input: {
        fontSize: 35,
        marginRight: 'auto',
        maxWidth: '70%',
    },
    IconButton: {
        verticalAlign: 'top'
    }
}));



export default function Transaction(props) {
    const [title, setTitle] = useState(props.transaction.title);
    const [description, setDescription] = useState(props.transaction.description);
    var tags = [];
    var comments = [];
    var [members, setMembers] = React.useState(props.transaction.userDTOS.filter(user => user.uid !== props.transaction.creatorId));
    const creator = props.transaction.userDTOS.filter(user => user.uid === props.transaction.creatorId)[0];
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleDeleteTransaction = () => {
        props.actionDelete(props.transaction.groupId, props.transaction.transactionId);
    }

    const listMember = () => {
        GroupApi.listAllGroups()
    }

    const handleDeleteMember = (uid) =>{
        debugger;
        transactionApi.deleteUserFromTransaction(props.transaction.transactionId,uid,(Response)=>{
            
        })
        
    }

    const handleAddmember = ()=>{
        transactionApi.addUserToTransaction(props.transaction.transactionId,props.transaction.creatorId,(Response)=>{
            setMembers(Response.data);
        })
    }

    const handleCloseDialog = () => {
        props.actionUpdate(
            props.transaction.groupId,
            props.transaction.transactionId,
            {
                title: title,
                description: description
            }
        );
        setOpen(false);
    }

    const listComment = () =>{

    }

    const CommentExample = () => (
        <Comment.Group>
            <Header as='h3' dividing>
                Comments
            </Header>

            <Comment>
                {/* <Avatar className={classes.avatar} style={{ margin: '0px' }}><PersonIcon /></Avatar> */}
                <Comment.Avatar as='a' src='https://api.adorable.io/avatars/211/abott@adorable' />
                <Comment.Content>
                    <Comment.Author>Tom Lukic</Comment.Author>
                    <Comment.Text>
                        This will be great for business reports. I will definitely download
                        this.
                    </Comment.Text>
                </Comment.Content>
            </Comment>

            <Comment>
                <Comment.Avatar as='a' src='https://api.adorable.io/avatars/211/abott@adorable' />
                <Comment.Content>
                    <Comment.Author>Stevie Feliciano</Comment.Author>
                    <Comment.Text>
                        Hey guys, I hope this example comment is helping you read this
                        documentation.
                    </Comment.Text>
                </Comment.Content>
            </Comment>

            <Form reply>
                <Form.TextArea />
                <Button content='Add Reply' labelPosition='left' icon='edit' primary />
            </Form>
        </Comment.Group>
    )

    function GenerateListItem() {
        debugger;
        return members.map((member) =>
            <ListItem button key={member.uid}>
                <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                        <PersonIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={member.username} />
                <ListItemSecondaryAction>
                    {
                        props.userId === props.transaction.creatorId ?
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMember(member.uid)}>
                                <DeleteIcon/>
                            </IconButton>
                            :
                            null
                    }
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     };
    // }, [input]);
    return (
        <div>
            <Card className="transaction-root">
                <CardActionArea onClick={() => setOpen(true)}>
                    <CardContent>
                        <Typography variant="h6" component="h2" className={classes.title}>
                            {title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <div>
                <Dialog
                    open={open}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="md"
                    fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-title" disableTypography={true} className={classes.dlalogTitle}>
                        <InputBase
                            className={classes.input}
                            placeholder="Title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            onBlur={(event) => props.transaction.title = event.target.value}
                        />
                        <IconButton aria-label="delete" className={classes.IconButton} onClick={handleDeleteTransaction}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="close" className={classes.IconButton} onClick={handleCloseDialog}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Grid container>
                            <Grid item container direction="column" xs={8}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    placeholder="need some descriptions"
                                    multiline
                                    rowsMax={10}
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    variant="outlined"
                                    fullWidth={true}
                                    size="medium"
                                    onBlur={(event) => props.transaction.description = event.target.value}
                                />
                                {/* <Grid item style={{ marginTop: '8px' }}>
                                    <Button variant="contained" color="blue" style={{ marginRight: '8px' }}>
                                        Save
                                    </Button>
                                    <Button style={{backgroundColor: 'inherit'}}>Cancel</Button>
                                </Grid> */}
                                <CommentExample />
                            </Grid>
                            <Grid item xs={4} container direction="column">
                                <Grid item>
                                    <Typography variant="h6" style={{ paddingLeft: '16px' }}>
                                        Creator
                                    </Typography>
                                    <div className={classes.demo}>
                                        <List>
                                            <ListItem>
                                                <ListItemAvatar>
                                                     <Avatar>
                                                        {creator.username.toUpperCase().slice(0, 2)}
                                                    </Avatar> 
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={creator.username}
                                                />
                                                <ListItemSecondaryAction></ListItemSecondaryAction>
                                            </ListItem >
                                        </List>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" style={{ paddingLeft: '16px' }}>
                                        Member
                                    </Typography>
                                    <div className={classes.demo}>
                                        <List dense={true}>
                                            <GenerateListItem />
                                            <ListItem autoFocus button>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <PersonAddIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Add member"  onClick ={handleAddmember}/>
                                            </ListItem>
                                        </List>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}


