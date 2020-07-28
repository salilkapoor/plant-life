import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: '15px 10px 15px 0',
    width: '100%',
    borderRadius: 5,
    border: '0.5px solid #a6a6a6',
    padding: '10px'
  },
  heading: {
    fontSize: '16px',
    color: '#5f5f5f'
  },
  count: {
    fontSize: '24px'
  },
  inCenter: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
}))

export default useStyles
