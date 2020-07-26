import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import AlertTemplate from 'react-alert-template-basic'
import { positions, Provider } from 'react-alert'
import { makeStyles } from '@material-ui/core/styles'
import { PrivateRoute, PublicRoute } from '../../../utils'

import { StateProvider } from '../../../store/stateProvider'

import SignIn from '../../SignIn/SignIn'
import ForgotPassword from '../../SignIn/ForgotPassword'
import ResetPassword from '../../SignIn/ResetPassword'
import Signup from '../../SignIn/Signup'
import ErrorBoundary from '../../ErrorBoundary'
import Header from '../../Header'
import Settings from '../../Settings'
import Overview from '../../Overview'
import { Dashboard } from '../../organisms/Dashboard'

import useWebInstallPrompt from '../../../hooks/useWebInstallPrompt'
import usePeriodicSync from '../../../hooks/usePeriodicSync'

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
    width: '0px'
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
                <PublicRoute
                  exact
                  path="/forgot-password"
                  component={ForgotPassword}
                />
                <PublicRoute
                  exact
                  path="/reset-password/:token"
                  component={ResetPassword}
                />
                <PublicRoute exact path="/settings" component={Settings} />
                <PublicRoute exact path="/overview" component={Overview} />
              </Switch>
            </Suspense>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

function App() {
  const [, , handleInstallAccepted] = useWebInstallPrompt()
  usePeriodicSync()

  return (
    <div className="App">
      <header className="App-header">
        <button className="App-link" onClick={() => handleInstallAccepted()}>
          Learn React
        </button>
      </header>
      <Dashboard />
      <StateProvider>
        <Provider template={AlertTemplate} {...options}>
          <Routing />
        </Provider>
      </StateProvider>
    </div>
  )
}

export default App
