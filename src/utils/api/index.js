import axios from 'axios'
import { cookieLoad, decodeToken } from '../index.js'

const API_GET = async (resourse) => {
  let token = cookieLoad('EnToken')
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/${resourse}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error.response.data.error
    })
}

const API_POST = async (resourse, body) => {
  let token = cookieLoad('EnToken')
  return await axios
    .post(`${process.env.REACT_APP_API_URL}/${resourse}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error.response.data.error
    })
}

const API_PATCH = async (resourse, body) => {
  let token = cookieLoad('EnToken')
  return await axios
    .patch(`${process.env.REACT_APP_API_URL}/${resourse}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error.response.data.error
    })
}
const API_DELETE = async (resourse, body) => {
  let token = cookieLoad('EnToken')
  return await axios
    .delete(`${process.env.REACT_APP_API_URL}/${resourse}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: body
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error.response.data.error
    })
}

export { API_GET, API_POST, API_PATCH, API_DELETE }
