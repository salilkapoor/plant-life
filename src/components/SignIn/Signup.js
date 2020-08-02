import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Button,
  Paper,
  Grid,
  TextField,
  Link,
  Typography
} from '@material-ui/core'
import signupImg from '../Assets/signup.svg'
import useStyles from './style.js'
import { API_POST } from '../../utils/api'

function Signup(props) {
  const { errorMessage, successMessage } = props
  const classes = useStyles()
  let history = useHistory()

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: ''
  })

  const handleStateChange = (key, value) => {
    const newState = state
    newState[key] = value
    setState({ ...newState })
  }

  const validEmailRegex = RegExp(
    /^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i
  )

  const handleSignup = () => {
    if (
      state.firstName === '' ||
      state.lastName === '' ||
      state.contact === '' ||
      state.email === '' ||
      state.password === '' ||
      state.confirmPassword === ''
    ) {
      errorMessage('All field required')
    } else if (!validEmailRegex.test(state.email)) {
      errorMessage('Email is not valid')
    } else if (state.password !== state.confirmPassword) {
      errorMessage('confirm password not match')
    } else {
      API_POST('signup', {
        firstName: state.firstName,
        lastName: state.lastName,
        contact: state.contact,
        email: state.email,
        password: state.password
      })
        .then((res) => {
          history.push('/signin')
        })
        .catch((err) => {
          console.log('Error', err.message)
        })
    }
  }

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs>
          <Typography variant="h5" align="center" className={classes.header}>
            Plant Control System
          </Typography>
          <Typography variant="h6" align="center" className={classes.header}>
            Signup
          </Typography>
        </Grid>
      </Grid>

      <form className={classes.form} id="signup" noValidate>
        <Grid container spacing={2} className={classes.fieldsWrapper}>
          <Grid xs={12} md={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  name="first_name"
                  value={state.firstName}
                  onChange={(e) => {
                    handleStateChange('firstName', e.target.value)
                  }}
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
                  onChange={(e) => {
                    handleStateChange('lastName', e.target.value)
                  }}
                />
              </Grid>
              <Grid xs={12} md={6} item>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="contact"
                  label="Contact"
                  name="contact"
                  autoComplete="contact"
                  value={state.contact}
                  onChange={(e) => {
                    handleStateChange('contact', e.target.value)
                  }}
                />
              </Grid>
              <Grid xs={12} md={6} item>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={state.email}
                  onChange={(e) => {
                    handleStateChange('email', e.target.value)
                  }}
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
                  onChange={(e) => {
                    handleStateChange('password', e.target.value)
                  }}
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
                  onChange={(e) => {
                    handleStateChange('confirmPassword', e.target.value)
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              spacing={3}
              className={classes.btns}
            >
              <Grid md={6}>
                <Link href="/signin">
                  <Button variant="outlined">Sign in Instead</Button>
                </Link>
              </Grid>

              <Grid md={6}>
                <Button
                  variant="contained"
                  className={classes.submit}
                  onClick={() => handleSignup()}
                >
                  Signup
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* 
          <Grid container justify="center" md={6} xs>
            <img src={signupImg} alt="logo" className={classes.signupImg} />
          </Grid> */}
        </Grid>
      </form>
    </Paper>
  )
}

export default Signup
