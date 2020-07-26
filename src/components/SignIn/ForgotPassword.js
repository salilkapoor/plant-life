import React, { useState } from 'react';
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

function ForgotPassword(props) {
  const {errorMessage,successMessage}=props

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [error , setError] = useState('');
  function credentials(e){
    switch(e.target.name){
      case "email" :
        return setEmail(e.target.value);
      default:
        return null
    }  
  }
  function forgotPassword(e){
    e.preventDefault();
    axios.post(process.env.REACT_APP_API_URL+'/corporate/forgetPassword', {
      email: email
    })
    .then(function (response) {
      successMessage(response.data.message)
      setTimeout(()=>{
        props.history.push('/signin');
      },1000)
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
        if(error.response.status === 401){
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
              <h4>Forgot Password</h4> 
              <span >
              Please confirm your Email ID for resetting your Password 
              </span>
          </div>
          </div>
          <form className={classes.form} noValidate   onSubmit={forgotPassword}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e)=>{credentials(e)}}
            />
                <div className="error-class">{error}</div>
                 
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submit}
              onClick={forgotPassword}
            >
              Confirm
            </Button>
           
          </form>
          
        </Paper>
      </Container>
    </>  
  );
}

export default ForgotPassword;