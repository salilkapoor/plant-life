import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '15px',
    margin: 'auto',
    maxWidth: 750,
    maxHeight: 750,
    borderRadius: 5,
    border: '0.5px solid #a6a6a6'
  },
  header: {
    margin: '10px 0 12px'
  },
  form: {
    width: '100%',
    fontSize: '12px'
  },
  fieldsWrapper: {
    padding: '15px'
  },
  submit: {
    color: '#ffffff',
    backgroundColor: '#e84f5b'
  },
  signupImg: {
    width: '350px'
  },
  btns: {
    padding: '15px'
  }
}))

export default useStyles
