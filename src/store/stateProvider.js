import React, { createContext, useContext, useReducer } from 'react'
import reducer from './reducer'
import { cookieLoad, decodeToken } from '../utils'

const StateContext = createContext()

let initialState = {
  token: '',
  isLogin: false,
  uid: '',
  alert: {
    open: false,
    status: 'error',
    message: ''
  }
}

let token = cookieLoad('token')
if (token) {
  let decodedToken = decodeToken(token)
  initialState = {
    token: token,
    isLogin: true,
    uid: decodedToken.uid,
    alert: {
      open: false,
      status: 'error',
      message: ''
    }
  }
}

export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)
