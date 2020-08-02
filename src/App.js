import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { FirebaseDatabaseProvider } from '@react-firebase/database'
import firebase from 'firebase'
import { config } from './utils/config'

import { Provider } from 'react-alert'
import { StateProvider } from './store/stateProvider'
import { makeStyles } from '@material-ui/core/styles'
import { PrivateRoute, PublicRoute } from './utils'

import SignIn from './components/SignIn/SignIn'
import Signup from './components/SignIn/Signup'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import Settings from './components/Settings'
import Overview from './components/Overview'
import AlertMeassage from './components/Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    width: '0px',
    paddingTop: '64px',
    backgroundColor: '#fafafa'
  }
}))

const Routing = () => {
  const classes = useStyles()

  return (
    <ErrorBoundary>
      <Router>
        <div className={classes.root}>
          <PrivateRoute path="/" component={Header} />
          <main className={classes.content}>
            <Suspense
              fallback={() => {
                return <div>Loading...</div>
              }}
            >
              <Switch>
                <PrivateRoute exact path="/" component={SignIn} />
                <PublicRoute exact path="/signup" component={Signup} />
                <PublicRoute exact path="/signin" component={SignIn} />
                <PrivateRoute exact path="/settings" component={Settings} />
                <PrivateRoute exact path="/overview" component={Overview} />
              </Switch>
              <AlertMeassage />
            </Suspense>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

function App() {
  return (
    <FirebaseDatabaseProvider {...config.firebaseConfig} firebase={firebase}>
      <StateProvider>
        <Provider>
          <Routing />
        </Provider>
      </StateProvider>
    </FirebaseDatabaseProvider>
  )
}

export default App
