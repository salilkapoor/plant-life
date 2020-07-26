import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {Button,makeStyles,Paper,TextField,Typography,Container} from '@material-ui/core';
import Logo from "../Assets/logo.png";
import './style.css'

import axios from 'axios';

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
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ResetPassword(props) {
  const {errorMessage,successMessage}=props

  let token = props.match.params.token;
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  function resetPassword(e){
    if(password!==confirmpassword){
      errorMessage("confirm password not match")
      return 0;
    }else if(password.length<8){
      errorMessage("Use 8 or more characters")
      return 0;
    }
    e.preventDefault();
    axios.post(process.env.REACT_APP_API_URL+'/corporate/resetPassword', {
      token: token,
      password: password    
    })
    .then(function (response) {
      if(response.status === 200){
        successMessage(response.data.message)
        setTimeout(()=>{
          props.history.push('/signin');
        },1000)
      }
    })
    .catch(function (error) {
      if(!error.response){
        errorMessage("Network Error");
        throw(error);  
      }else{
        if(error.response.status === 400){
          errorMessage(error.response.data.error.message);
        } 
  
        if(error.response.status === 500){
          errorMessage(error.response.data.error.message);
        } 
      }
    });
  }

  return (
    <>
    
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <div className="signin-logo"> 
          <img src={Logo} alt="logo" className="signin-dror-logo" />
          <div className="signin-title">
              <h4>Reset your Password</h4> 
              <span >
              Use 8 or more characters with a mix of letter, numbers and symbols 
              </span>
          </div>
         

          </div>
          <form className={classes.form} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
             <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="Confirm Password"
              type="password"
              id="confirm_password"
              value={confirmpassword}
              autoComplete="confirm_password"
              onChange={(e)=>{setConfirmPassword(e.target.value)}}
            />
                 
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e)=>{resetPassword(e)}}
            >
              Update Password
            </Button>
          </form>
          
        </Paper>
      </Container>
    </>  
  );
}

export default ResetPassword;