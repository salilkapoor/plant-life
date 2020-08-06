import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    margin: 'auto',
    width: '100%',
    borderRadius: 5,
    border: '0.5px solid #a6a6a6'
  }
}))

export default useStyles
