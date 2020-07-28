import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import AlertTemplate from 'react-alert-template-basic'
import { positions, Provider } from 'react-alert'
import { StateProvider } from './store/stateProvider'
import { makeStyles } from '@material-ui/core/styles'
import { PrivateRoute, PublicRoute } from './utils'

import SignIn from './components/SignIn/SignIn'
import Signup from './components/SignIn/Signup'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import Settings from './components/Settings'
import Overview from './components/Overview'

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    width: '0px',
    paddingTop: '64px'
  }
}))

const Routing = () => {
  const classes = useStyles()

  return (
    <ErrorBoundary>
      <Router>
        <div className={classes.root}>
          <Header />
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
            </Suspense>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

function App() {
  return (
    <StateProvider>
      <Provider template={AlertTemplate} {...options}>
        <Routing />
      </Provider>
    </StateProvider>
  )
}

export default App
