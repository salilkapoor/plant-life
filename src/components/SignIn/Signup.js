import React, { useState } from 'react'
function Signup(props) {
  const { errorMessage, successMessage } = props

  const [state, setState] = React.useState({
    company: '',
    email: '',
    address: '',
    city: '',
    contact: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    state: ''
  })
  const handleStateChange = (key, value) => {
    const newState = state
    newState[key] = value
    setState({ ...newState })
  }
  const [step, setStepSignUp] = useState(1)

  return <></>
}

export default Signup
