import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '80px',
  },
  cards: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
  },
  paperTable: {
    padding: theme.spacing(2),
    boxShadow: 'none',
  },
  block: {
    margin: '14px 0',
  },
}));
