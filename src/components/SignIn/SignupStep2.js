import React, { useState } from "react";
import {
  Button,
  Hidden,
  Paper,
  Grid,
  makeStyles,
  TextField,
  Container,
} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import MuiPhoneNumber from 'material-ui-phone-number';
import { Redirect } from 'react-router-dom';

import WorkIcon from '@material-ui/icons/Work';
import { display } from '@material-ui/system';

import axios from "axios";
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
    marginTop: theme.spacing(3),
    fontSize: "12px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cursor: {
    cursor: "pointer",
  },
}));

function SignupStep2(props) {
  const {errorMessage,successMessage}=props

  const {setStepSignUp,handleStateChange,state} = props
  const classes = useStyles();
  const [isSignup, setSignup] = useState(false);
  const validation = (e) => {
    if(state.contact==="" || state.city=="" || state.state=="" || state.address==""){
      errorMessage("All field required")
    }else if(state.contact.length!==10){
      errorMessage("Invalid phone number")
    }else{
      signup(e)
    }
    
}

  const signup = (e) => {
    e.preventDefault();
    let formData = {
      "corporate":{
          "company": state.company,
          "email" : state.email,
          "address": state.address,
          "city": state.city,
          "state": state.state,
          "contact": state.contact      
        },
      "admin":{
          "firstName": state.firstName,
          "lastName": state.lastName,
          "email" : state.email,
          "password": state.password,
          "contact": state.contact      
      } 
    };
    axios
      .post(process.env.REACT_APP_API_URL+`/corporate/signup`, formData)
      .then((res) => {
        setTimeout(()=>{
          setSignup(true);
        },1000)
        successMessage(res.data.message)
      })
      .catch(function (error) {
        if (!error.response) {
          errorMessage("Network Error");
          throw error;
        } else {
          if (error.response.status === 400) {
            errorMessage(error.response.data.error.message);
          }

          if (error.response.status === 409) {
            errorMessage(error.response.data.error.message);
          }

          if (error.response.status === 500) {
            errorMessage(error.response.data.error.message);
          }
        }
      });
  };

  return (
    
    <Container component="main">
       {isSignup && 
        <Redirect to='/signin' />
      }
      <Paper className={classes.paper}>
       
        
        <form className={classes.form} id="signup" noValidate>
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
            <div className="signup-logo-section">
            <img src={Logo} alt="logo" className="dror-logo" />
              <span className="signup-title">
              Welcome to Dror Enterprise              
              </span>
            </div>
              <Grid container spacing={2}>
                <Grid xs={12} md={12} item>
                  <div className="account_circle">
                  <AccountCircleIcon/>
  <span>{state.firstName+ ' ' +state.lastName}</span>
                  </div>

                </Grid>
                <Grid xs={12} md={12} item>
                  <div className="work-icon">
                  <WorkIcon/>
                  <span>{state.company}
                  </span>
                  </div>

                </Grid>
                <Grid item xs={12} md={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    type="number"
                    id="phone"
                    autoComplete="phone"
                    value={state.contact}
                    onChange={(e)=>{ handleStateChange('contact',e.target.value)}}
    
                  />
                {/* <MuiPhoneNumber defaultCountry={'in'}
                inputClass="input-class-phone"
                value={state.contact}
                onChange={(e)=>{ handleStateChange('contact',e)}}
                        className="phone-number"/>
                <span>{"We’ll use your number for account security. It won’t be visible to others."}</span> */}
                </Grid>


                <Grid xs={12} md={6} item>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="city"
                    label="City"
                    type="text"
                    id="city"
                    autoComplete="city"
                    value={state.city}
                    onChange={(e)=>{ handleStateChange('city',e.target.value)}}

                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="state"
                    label="State"
                    type="text"
                    id="state"
                    autoComplete="state"
                    value={state.state}
                    onChange={(e)=>{ handleStateChange('state',e.target.value)}}
    
                  />
                </Grid>
                <Grid xs={12} md={12} item>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="companyaddress"
                    label="Company Address"
                    name="companyaddress"
                    autoComplete="companyaddress"
                    value={state.address}
                    onChange={(e)=>{ handleStateChange('address',e.target.value)}}

                  />
                </Grid>

            </Grid>
            <Grid container>
              <Grid md={6}>
                <Button fullWidth className={classes.submit}  onClick={(e) => {
                    setStepSignUp(1)
                  }} color="secondary">
                  Back
                </Button>
              </Grid>
              <Grid md={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(e)=>{validation(e)}}

                >
                  Sign up
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

export default SignupStep2;
