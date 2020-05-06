import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActionArea, TextField, InputBase, IconButton } from '@material-ui/core';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { Avatar, Grid, Typography } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

import './css/Transaction.css';
import 'semantic-ui-css/semantic.min.css';

const useStyles = makeStyles((theme) => ({
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
    left: {
        flex: '70%',
    },
    right: {
        flex: '30%',
    },
    IconButton: {
        verticalAlign: 'top'
    }
}));



export default function Transaction(props) {
    const [title, setTitle] = React.useState(props.transaction.title);
    const [description, setDescription] = React.useState(props.transaction.description);
    var tags = [];
    var comments = [];
    var members = ["George Yang", "Andrew Lin", "Ben Nyan"];

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const actionDelete = () => {
        props.actionDelete(props.transaction.groupId, props.transaction.transactionId);
    }

    const CommentExample = () => (
        <Comment.Group>
            <Header as='h3' dividing>
                Comments
            </Header>
    
            <Comment>
                <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                <Comment.Content>
                    <Comment.Author>Tom Lukic</Comment.Author>
                    <Comment.Text>
                        This will be great for business reports. I will definitely download
                        this.
                    </Comment.Text>
                </Comment.Content>
            </Comment>
    
            <Comment>
                <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
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
        return members.map((member) =>
            <ListItem key={member}>
                <ListItemAvatar>
                    <Avatar>
                        {member.toUpperCase().slice(0, 2)}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={member}
                    secondary="Secondary text"
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem >
        );
    }

    return (
        <div>
            <Card className="transaction-root">
                <CardActionArea onClick={() => setOpen(true)}>
                    <CardContent>
                        <Typography variant="h5" component="h2" className={classes.title}>
                            {title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <div>
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
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
                        />
                        <IconButton aria-label="delete" className={classes.IconButton} onClick={actionDelete}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="close" className={classes.IconButton} onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div className={classes.left}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Description"
                                multiline
                                rowsMax={10}
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                variant="outlined"
                                fullWidth={true}
                                size="medium"
                            />
                            <CommentExample />
                        </div>
                        <div className={classes.right}>
                            <Typography variant="h6" style={{ paddingLeft: '16px' }}>
                                Member
                            </Typography>
                            <div className={classes.demo}>
                                <List>
                                    <GenerateListItem />
                                </List>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}


