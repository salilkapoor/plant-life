import React, { useState } from "react";
import {
  Button,
  Paper,
  Grid,
  makeStyles,
  TextField,
  Container,
  Link
} from "@material-ui/core";
import Logo from "../Assets/logo.png";
import signupImg from "../Assets/signup.svg";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(5),
    margin: "auto",
    maxWidth: 750,
    maxHeight: 750,
    borderRadius: 5,
    border: "0.5px solid #a6a6a6",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
    fontSize: "12px",
  },
  textField:{
    width:100,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cursor: {
    cursor: "pointer",
  },
}));

function SignupStep1(props) {
  const {errorMessage,successMessage}=props

  const {setStepSignUp,handleStateChange,state} = props
  const classes = useStyles();
  const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

  const nextStep = () => {
    if(state.company==="" || state.firstName=="" || state.lastName=="" || state.email=="" || state.password =="" || state.confirmPassword==""){
      errorMessage("All field required")
    }else if (!validEmailRegex.test(state.email)) {
      errorMessage("Email is not valid")
  }else if(state.password!== state.confirmPassword){
    errorMessage("confirm password not match")
  }else{
    setStepSignUp(2)
  }
}

  return (
    <Container component="main">
      <Paper className={classes.paper}>
        <form className={classes.form} id="signup" noValidate>
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
            <div className="signup-logo-section">
            <img src={Logo} alt="logo" className="dror-logo" />
              <span className="signup-title">
              Create your Dror Account              
              </span>
            </div>
              <Grid container spacing={2}>
                <Grid xs={12} md={12} item>
                  <TextField
                    autoComplete="fname"
                    name="company"
                    variant="outlined"
                    required
                    fullWidth
                    id="company"
                    label="Company Name"
                    autoFocus
                    value={state.company}
                    onChange={(e)=>{ handleStateChange('company',e.target.value)}}
                    className="form-input-field"
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    name="first_name"
                    value={state.firstName}
                    onChange={(e)=>{ handleStateChange('firstName',e.target.value)}}

                  />
                </Grid>

                <Grid xs={12} md={6} item>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    value={state.lastName}
                    onChange={(e)=>{ handleStateChange('lastName',e.target.value)}}
                  />
                </Grid>

                <Grid xs={12} md={12} item>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={state.email}
                    onChange={(e)=>{ handleStateChange('email',e.target.value)}}

                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={state.password}
                    onChange={(e)=>{ handleStateChange('password',e.target.value)}}
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    id="confirm_password"
                    autoComplete="confirm_password"
                    value={state.confirmPassword}
                    onChange={(e)=>{ handleStateChange('confirmPassword',e.target.value)}}
                  />
                </Grid>
            </Grid>
            <Grid container>
              <Grid md={6}>
                <Link href="/signin">

                <Button fullWidth className={classes.submit}  color="secondary">
                  Sign in Instead
                  </Button>
                </Link>
              </Grid>
              <Grid md={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={nextStep}
                >
                  Next
                </Button>
              </Grid>
            </Grid>

          </Grid>
         

          <Grid  md={6} xs>
            <img src={signupImg} alt="logo" className="signup-img" />
          </Grid>
       </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default SignupStep1;
