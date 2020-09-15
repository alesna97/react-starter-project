import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
  // Styleing React Component
  mainContainer: {
    height: '100%',
    width: '100%',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '80%',
    [
    theme
      .breakpoints
      .only('xs')
    ]: {
      width: '95%'
    }
  },
  img: {
    marginBottom: 15,
    marginTop: 15,
    width: '350px',
    heigth: '250px',
    [
    theme
      .breakpoints
      .only('xs')
    ]: {
      width: '250px',
      heigth: '150px'
    }
  },
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    width: '70%',
    padding: theme.spacing(2)
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#C4A643'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#C4A643'
    }
  },
  links: {
    color: '#C4A643',
    marginTop: 13,
    fontSize: 14
  }
}));

export default styles;
