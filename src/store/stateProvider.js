import React, { createContext, useContext, useReducer } from 'react'
import reducer from './reducer'
import { decodeToken } from '../utils'

const StateContext = createContext()

let initialState = {
  token: '',
  isLogin: false,
  employeeId: '',
  role: '',
  name: '',
  contact: '',
  enterpriseId: '',
  address: '',
  city: '',
  employeesCount: '',
  user: '',
  contactTracingEmployees: '',
  alert: {
    open: false,
    status: 'error',
    message: ''
  }
}

// let token = cookieLoad('EnToken');
let token = null
if (token) {
  let decodedToken = decodeToken(token)
  initialState = {
    token: token,
    isLogin: true,
    role: decodedToken.user.role,
    enterpriseId: decodedToken.user.id,
    name: decodedToken.user.companyName,
    contact: decodedToken.user.contact,
    address: decodedToken.user.address,
    city: decodedToken.user.city,
    employeesCount: decodedToken.user.employeesCount,
    user: decodedToken.user,
    branchName: decodedToken.user.name,
    contactTracingEmployees: '',
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
