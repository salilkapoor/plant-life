import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import jwt from 'jsonwebtoken'
import { useStateValue } from '../store/stateProvider'

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [, dispatch] = useStateValue()
  const errorMessage = (message) => {
    dispatch({
      type: 'ERROR_MESSAGES',
      payload: {
        alert: {
          open: true,
          status: 'error',
          message
        }
      }
    })
  }
  const successMessage = (message) => {
    dispatch({
      type: 'ERROR_MESSAGES',
      payload: {
        alert: {
          open: true,
          status: 'success',
          message
        }
      }
    })
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        cookie.load('EnToken') !== undefined ? (
          <Component
            {...props}
            successMessage={successMessage}
            errorMessage={errorMessage}
          />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  )
}

export const PublicRoute = ({ component: Component, ...rest }) => {
  const [store, dispatch] = useStateValue()
  const errorMessage = (message) => {
    dispatch({
      type: 'ERROR_MESSAGES',
      payload: {
        alert: {
          open: true,
          status: 'error',
          message
        }
      }
    })
  }
  const successMessage = (message) => {
    dispatch({
      type: 'ERROR_MESSAGES',
      payload: {
        alert: {
          open: true,
          status: 'success',
          message
        }
      }
    })
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        cookie.load('EnToken') === undefined ? (
          <Component
            {...props}
            successMessage={successMessage}
            errorMessage={errorMessage}
          />
        ) : (
          <>
            {store.role !== 2 ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/overview" />
            )}
          </>
        )
      }
    />
  )
}
export const cookieLoad = () => cookie.load('EnToken')

export const cookieSave = (token) =>
  cookie.save('EnToken', token, { path: '/' })

export const cookieRemove = () => cookie.remove('EnToken', { path: '/' })

export const decodeToken = (token) => {
  let tokenloaded = token ? token : cookie.load('EnToken')
  if (tokenloaded !== undefined) {
    return jwt.decode(tokenloaded)
  }
}
