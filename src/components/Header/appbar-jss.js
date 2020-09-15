import { makeStyles } from "@material-ui/core";

const drawerWidth = 200;


const useStyles = makeStyles(theme => ({
  appBar: {
    // backgroundColor: '#FFFFFF',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  toolBar: {
    display: 'flex',
    alignItems: 'center'
  },
  toolbarTitle: {
    flex: 1,
    marginLeft: 60,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  toolbarTitleShift: {
    marginLeft: drawerWidth + 50,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    flex: 1,
  },
  mobileTitle: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  notificationIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]:{
      marginLeft: 0,
      marginRight: 0,
    }
  },
  notificationIconMobile: {
    [theme.breakpoints.down('sm')]:{
      fontSize: 26,
      flex: 1,
      flexGrow: 1,
    }
  },
  typography: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]:{
      display: 'none'
    }
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  avatarIcon: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  menuDekstop: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.only("sm")]: {
      display: 'none'
    }
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  menuItemIcon: {
    marginRight: theme.spacing(3)
  },
  signOutButton: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(1)
  },
  menuIcon: {
    flex: 1,
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}));

export default useStyles;