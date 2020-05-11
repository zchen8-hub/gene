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
import Chip from '@material-ui/core/Chip';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import transactionApi from '../api/transaction'
import CommentApi from '../api/comment'
import './css/Transaction.css';
import 'semantic-ui-css/semantic.min.css';
import TagApi from '../api/tag';

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
const filter = createFilterOptions();

export default function Transaction(props) {
    const classes = useStyles();
    const [transaction, setTransaction] = useState(props.transaction);
    const [title, setTitle] = useState(props.transaction.title);
    const [description, setDescription] = useState(props.transaction.description);
    const [transactionMembers, setTransactionMembers] = useState(props.transaction.userDTOs);
    const [open, setOpen] = useState(false);
    const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
    const creator = props.transaction.userDTOs.filter(user => user.uid === props.transaction.creatorId)[0];
    const [projectMembers, setProjectMembers] = useState(props.projectMembers);
    const [commentValue, setCommentValue] = useState("");
    const [comments, setComments] = useState([]);
    const [tags, setTags] = useState(props.tags);
    // const tags = [
    //     {
    //         tagName: "123"
    //     },
    //     {
    //         tagName: "456"
    //     },
    //     {
    //         tagName: "789"
    //     }
    // ];
    const [value, setValue] = React.useState(null);

    useEffect(() => {
        CommentApi.listAllComment(props.userId, transaction.transactionId, (response) => {
            setComments(response.data);
        })
    }, []);

    const handleDeleteTransaction = () => {
        props.actionDelete(props.transaction.groupId, props.transaction.transactionId);
    }

    const handleDeleteMember = (uid) => {
        console.log("handleDeleteMember");
        console.log(uid);
        transactionApi.deleteUserFromTransaction(props.transaction.transactionId, uid, (response) => {
            if (response.code === "200") {
                setTransaction(response.data);
                setTransactionMembers(response.data.userDTOS);
            }
            console.log(transactionMembers);
        })
    }

    const handleAddmember = (uid) => {
        console.log("handleAddmember");
        console.log(uid);
        transactionApi.addUserToTransaction(props.transaction.transactionId, uid, (response) => {
            if (response.code === "200") {
                setTransaction(response.data);
                setTransactionMembers(response.data.userDTOS)
                setAddMemberDialogOpen(false);
            }
            console.log(transactionMembers);
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

    const handleCommentChange = (event) => {
        setCommentValue(event.target.value);
    }

    const handleCommentSubmit = () => {
        let comment = {
            comment: commentValue
        }
        CommentApi.addComment(
            props.userId,
            transaction.transactionId,
            comment,
            (response) => {
                comments.push(response.data);
                setCommentValue("");
            })
    }

    const handleAddTag = (tagName) => {
        props.actionCreateTag(tagName);
    }

    function CommentExample() {
        return comments.map((comment) =>
            <Comment key={comment.commentId}>
                <Comment.Avatar as='a' src='https://api.adorable.io/avatars/211/abott@adorable' />
                <Comment.Content>
                    <Comment.Author>
                        {projectMembers.find(member => member.uid === comment.createrId).username}
                    </Comment.Author>
                    <Comment.Text>
                        {comment.comment}
                    </Comment.Text>
                </Comment.Content>
            </Comment>
        );
    }

    function GenerateMemberListItem() {
        return transactionMembers.filter(member => member.uid !== transaction.creatorId).map((member) =>
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
                                <DeleteIcon />
                            </IconButton>
                            :
                            null
                    }
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    const AddMemberDialog = () => (
        <Dialog
            open={addMemberDialogOpen}
            onClose={() => setAddMemberDialogOpen(false)}>
            <DialogTitle id="simple-dialog-title">Please select user</DialogTitle>
            <List>
                {projectMembers.filter(member => !transactionMembers.find(m => m.uid === member.uid)).map((member) => (
                    <ListItem
                        button
                        onClick={() => handleAddmember(member.uid)}
                        key={member.username}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={member.username} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    )

    return (
        <div>
            <Card className="transaction-root">
                <CardActionArea onClick={() => setOpen(true)}>
                    <CardContent>
                        <Typography variant="h6" component="h2" className={classes.title}>
                            {title}
                        </Typography>
                        {
                            tags.map((tag) =>
                                <Chip label={tag.tagName} color="primary" />
                            )
                        }

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
                        {
                            props.userId === props.projectCreatorId ?
                                <IconButton aria-label="delete" className={classes.IconButton} onClick={handleDeleteTransaction}>
                                    <DeleteIcon />
                                </IconButton>
                                :
                                null
                        }
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
                                <Comment.Group>
                                    <Header as='h3' dividing>
                                        Comments
                                     </Header>
                                    <CommentExample />
                                    <Form reply>
                                        <Form.TextArea
                                            placeholder="add some comments"
                                            value={commentValue}
                                            onChange={handleCommentChange} />
                                        <Button
                                            content='Add Reply'
                                            labelPosition='left'
                                            icon='edit'
                                            primary
                                            onClick={() => handleCommentSubmit()} />
                                    </Form>
                                </Comment.Group>
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
                                            <GenerateMemberListItem />
                                            <ListItem autoFocus button>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <PersonAddIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Add member" onClick={() => setAddMemberDialogOpen(true)} />
                                            </ListItem>
                                        </List>
                                        <AddMemberDialog />
                                    </div>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" style={{ paddingLeft: '16px', paddingBottom: '8px' }}>
                                        Tags
                                    </Typography>
                                    <Autocomplete
                                        value={value}
                                        onChange={(event, newValue) => {
                                            // Create a new value from the user input
                                            if (newValue && newValue.inputValue) {
                                                setValue({
                                                    tagName: newValue.inputValue,
                                                });
                                                handleAddTag(newValue.inputValue);
                                                return;
                                            } 
                                            setValue(newValue);
                                        }}
                                        filterOptions={(options, params) => {
                                            const filtered = filter(options, params);

                                            // Suggest the creation of a new value
                                            if (params.inputValue !== '') {
                                                filtered.push({
                                                    inputValue: params.inputValue,
                                                    tagName: `Add "${params.inputValue}"`,
                                                });
                                            }

                                            return filtered;
                                        }}
                                        selectOnFocus
                                        clearOnBlur

                                        id="free-solo-with-text-demo"
                                        options={tags}
                                        getOptionLabel={(option) => {
                                            // Value selected with enter, right from the input
                                            if (typeof option === 'string') {
                                                return option;
                                            }
                                            // Add "xxx" option created dynamically
                                            if (option.inputValue) {
                                                return option.inputValue;
                                            }
                                            // Regular option
                                            return option.tagName;
                                        }}
                                        renderOption={(option) => option.tagName}
                                        style={{ width: 300 }}
                                        freeSolo
                                        renderInput={(params) => (
                                            <TextField 
                                                {...params} 
                                                label="Free solo with text demo" 
                                                variant="outlined" />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}


