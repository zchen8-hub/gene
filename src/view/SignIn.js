import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom'

import CopyRight from "../components/copyright";
import useStyles from "../components/useStyles";
import userApi from "../api/user"

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userId: '',
            redirect: false
        }
        this.onChange = this.onChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSignIn() {
        debugger;
        const { username, password } = this.state

        const user = {
            username,
            password
        }

        userApi.login(user, (response) => {
            if (response.data) {
                this.setState({ userId: response.data.uid });
                console.log("success");
                this.setState({ redirect: true });
            }
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={
                {
                    pathname: `/ProjectList/${this.state.userId}`,
                    state: {
                        username: this.state.username
                    }
                }
            }
            />;
        }

        return (
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div style={{ marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Avatar style={{ margin: '8px', backgroundColor: 'rgb(220, 0, 78)', }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" >
                        Sign in
                    </Typography>
                    <form style={{ width: '100%', marginTop: '8px', }} noValidate >
                        <TextField variant="outlined"
                            margin="normal"
                            required fullWidth id="username"
                            label="UserName"
                            name="username"
                            value={this.username}
                            onChange={this.onChange}
                            autoFocus />
                        <TextField variant="outlined"
                            margin="normal"
                            required fullWidth name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={this.password}
                            onChange={this.onChange}
                            autoComplete="current-password" />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me" />
                        <Button 
                            fullWidth variant="contained"
                            color="primary"
                            style={{
                                marginTop: '24px',
                                marginBottom: '16px'
                            }}
                            onClick={this.handleSignIn} >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs >
                                <Link href="#"
                                    variant="body2" >

                                </Link>
                            </Grid>
                            <Grid item >
                                <Link href="./SignUp" variant="body2" >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8} >
                    <CopyRight />
                </Box>
            </Container>
        );
    }
}
export default SignIn;