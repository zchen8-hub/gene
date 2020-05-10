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
import userApi from "../api/user";
import CopyRight from "../components/copyright";

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            phone:'',
            password:''
        }
        this.onChange = this.onChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }
    
    handleSignUp(){
        const {firstName, lastName, email, phone, password} = this.state;
    
        const user = {
            username: firstName + lastName,
            email,
            phone,
            password
        }
        userApi.signup(user,(response) =>{
            window.open("/")
        })
    }
    
    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    render() {
        let {firstName, lastName, email, phone, password} = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div style={{marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <Avatar style={{margin: '8px', backgroundColor: 'rgb(220, 0, 78)',}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form style={{width: '100%', marginTop: '8px',}} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    value ={firstName}
                                    onChange = {this.onChange}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    value ={lastName}
                                    onChange = {this.onChange}
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value ={email}
                                    onChange = {this.onChange}
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    value ={phone}
                                    onChange = {this.onChange}
                                    name="phone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value ={password}
                                    onChange = {this.onChange}
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{
                                marginTop: '24px',
                                marginBottom: '16px'
                            }}
                            onClick={this.handleSignUp}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <CopyRight />
                </Box>
            </Container>
        );
    }
}

export default SignUp;