import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { useStateValue } from '../../store/stateProvider'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function AlertMeassage() {
  const [store, dispatch] = useStateValue()
  let { status = 'success', message, open = true } = store.alert
  const state = {
    vertical: 'top',
    horizontal: 'right'
  }
  const { vertical, horizontal } = state
  const handleClose = () => {
    dispatch({
      type: 'ERROR_MESSAGES',
      payload: {
        alert: {
          open: false,
          status,
          message
        }
      }
    })
  }

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={status}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
