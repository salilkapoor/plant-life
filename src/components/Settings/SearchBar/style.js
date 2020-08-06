import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 'auto',
    width: '100%',
    borderRadius: 5,
    border: '0.5px solid #a6a6a6'
  },
  title: {
    cursor: 'pointer',
    padding: '5px 10px',
    margin: '3px 0px',
    '&:hover': {
      backgroundColor: '#f5f5f5'
    }
  },
  searchBar: {
    position: 'relative'
  },
  btn: {
    marginLeft: '10px',
    width: '60%'
  },
  btn_wrapper: {
    margin: '5px',
    display: 'flex',
    justifyContent: 'center'
  },
  btnItem: {
    alignItems: 'center',
    display: 'flex'
  },
  search_result: {
    position: 'absolute',
    background: 'white',
    maxHeight: '220px',
    height: 'auto',
    zIndex: '999;',
    width: '100%'
  }
}))

export default useStyles
