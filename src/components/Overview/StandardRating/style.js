import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  content: {
    flex: '1 0 auto',
    padding: 10,
    minHeight: 380
  },
  titleWrapper: {
    padding: '18px 0 0 0'
  },
  title: {
    fontSize: '19px'
  },
  subtitle: {
    padding: '10px 0 14px 0'
  },
  loader: {
    transform: 'none !important'
  },
  footer: {
    margin: '35px 0 15px 0',
    color: '#5f5f5f'
  },
  scorecard: {
    minWidth: '100%'
  }
}))

export default useStyles
