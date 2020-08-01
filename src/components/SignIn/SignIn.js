import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useStateValue } from '../../store/stateProvider'
import { Button, Paper, TextField, Container, Grid } from '@material-ui/core'
import { API_POST } from '../../utils/api'
import { cookieSave, decodeToken } from '../../utils'
import useStyles from './style.js'

function SignIn(props) {
  let history = useHistory()
  const [store, dispatch] = useStateValue()

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

    API_POST('login', {
      email,
      password
    })
      .then((response) => {
        cookieSave(response.data.token)
        let decodedToken = decodeToken(response.data.token)
        dispatch({
          type: 'INITIALIZE_LOGIN_SUCCESS',
          payload: {
            token: response.data.token,
            isLogin: true,
            uid: decodedToken.uid
          }
        })
        history.push('/overview')
      })
      .catch((err) => {
        console.log('Error', err)
      })
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
      <Grid container justify="center" className={classes.btns}>
        <Link to="/signup">Signup</Link>
      </Grid>
    </Container>
  )
}

export default SignIn
