import { createMuiTheme } from '@material-ui/core/styles';
import gcda from './colors/colors';

const theme = createMuiTheme({
  palette: gcda,
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Open Sans',
    ].join(',')
  },
  overrides: {
    MuiButton: {
      root: {
        color: 'white',
        fontWeight: 'bold'
      }
    },
    MuiInput: {
      root: {
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#C4A643"
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#C4A643"
            }
        },
      },
    MuiTypography:{
      root: {
        
      }
    },
    MuiCard: {
      root: {
        borderRadius: 12
      }
    }
  }
});

export default theme;