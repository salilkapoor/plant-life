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
        cookie.load('token') !== undefined ? (
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
        cookie.load('token') === undefined ? (
          <Component
            {...props}
            successMessage={successMessage}
            errorMessage={errorMessage}
          />
        ) : (
          <Redirect to="/overview" />
        )
      }
    />
  )
}
export const cookieLoad = () => cookie.load('token')

export const cookieSave = (token) => cookie.save('token', token, { path: '/' })

export const cookieRemove = () => cookie.remove('token', { path: '/' })

export const decodeToken = (token) => {
  let tokenloaded = token ? token : cookie.load('token')
  if (tokenloaded !== undefined) {
    return jwt.decode(tokenloaded)
  }
}
