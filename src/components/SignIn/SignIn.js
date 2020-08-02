import React, { useState } from 'react'

import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Container
} from '@material-ui/core'
import './style.css'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(5),
    margin: 'auto',
    maxWidth: 750,
    maxHeight: 750,
    borderRadius: 5,
    border: '0.5px solid #a6a6a6'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

function SignIn(props) {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function credentials(e) {
    switch (e.target.name) {
      case 'email':
        return setEmail(e.target.value)

      case 'password':
        return setPassword(e.target.value.trim())

      default:
        return null
    }
  }

  function signin(e) {
    e.preventDefault()
    props.history.push('/overview')
  }

  return (
    <Container component="main" maxWidth="xs">
      <h1>Plant Control System</h1>
      <Paper className={classes.paper}>
        <div className="signin-title">
          <h2>SignIn</h2>
          <span>to continue to Admin Dashboard</span>
        </div>
        <form className={classes.form} noValidate onSubmit={signin}>
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
            onChange={(e) => {
              credentials(e)
            }}
          />
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
            onChange={(e) => {
              credentials(e)
            }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            color="primary"
            className={classes.submit}
            onClick={signin}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default SignIn
