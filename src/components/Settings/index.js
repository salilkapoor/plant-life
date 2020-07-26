import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  StepIcon
} from '@material-ui/core'
import { useStateValue } from '../../store/stateProvider'
import clsx from 'clsx'
import { API_POST, API_GET } from '../../utils/api'
import './Setting.css'
import axios from 'axios'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    margin: 'auto',
    width: '100%',
    borderRadius: 5,
    border: '0.5px solid #a6a6a6'
  },
  fixedHeight: {
    height: 'auto'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  }
}))

function Setting(props) {
  const { errorMessage, successMessage } = props
  const classes = useStyles()
  const [store, dispatch] = useStateValue()
  const [stateUser, setUserState] = useState({
    companyName: ''
  })

  const handleUserState = (key, value) => {
    const newState = stateUser
    newState[key] = value
    setUserState({ ...newState })
  }

  const getProfile = () => {
    API_GET(`plants/getPlant`)
      .then((res) => {
        setUserState({
          companyName: ''
        })
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  useEffect(() => {
    getProfile()
  }, [])

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                required
                id="cname"
                name="companyname"
                label="Search Plant"
                fullWidth
                value={stateUser.companyName}
                onChange={(e) => {
                  handleUserState('companyName', e.target.value)
                }}
                autoComplete="cname"
                variant="outlined"
                disabled={store.role !== 1}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {}}
                color="primary"
              >
                Add
              </Button>
            </Grid>
            <Paper className={fixedHeightPaper}>
              <div className="space">
                <Typography variant="h6" gutterBottom>
                  Plant Profile
                </Typography>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Setting
