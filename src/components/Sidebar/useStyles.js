import { makeStyles, darken, lighten } from '@material-ui/core';

const drawerWidth = 240;
const borderRadius = 20;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  footerTitleShift: {
    color: 'white',
    marginLeft: 80,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  footerTitle: {
    color: 'white',
    marginLeft: drawerWidth + 40,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  footer: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    height: 50,
    backgroundColor: '#565656',
    display: 'flex',
    alignItems: 'center',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  footerShift: {
    backgroundColor: '#565656',
    width: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0'
    }
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer2: {
    borderTopRightRadius: borderRadius,
    zIndex: theme.zIndex.drawer + 2,
    width: 60,
    backgroundColor: darken(theme.palette.secondary.main, 0.1),
    height: '100%',
    position: 'fixed',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  toolbar2: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  menuIcon: {
    display: 'flex',
    borderTopRightRadius: borderRadius,
    justifyContent: 'center',
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(0, 1),
    height: 64
  },
  list: {
    marginBottom: theme.spacing(1),
    '&:hover': {
      backgroundColor: darken(theme.palette.secondary.main, 0.5)
    },
    '&.Mui-selected': {
      backgroundColor: lighten(theme.palette.secondary.main, 0.1),
      borderRight: `solid ${theme.palette.primary.main} 4px`,
    },
  },
  listItemMobile: {
    '&:hover': {
      backgroundColor: darken(theme.palette.secondary.main, 0.5)
    },
    '&.Mui-selected': {
      backgroundColor: lighten(theme.palette.secondary.main, 0.1)
    }
  },
  drawer: {
    zIndex: theme.zIndex.drawer + 1,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    borderTopRightRadius: borderRadius,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.mainText,
    fontWeight: 'bold',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  drawerClose: {
    borderTopRightRadius: borderRadius,
    fontWeight: 'bold',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.mainText,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  toolbar: {
    marginLeft: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: 14,
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
  },
  mainContent: {
    backgroundColor: '#D4D4D4',
    height: '100%'
  },
  icon: {
    color: theme.palette.primary.accent
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  submenu: {
    paddingLeft: theme.spacing(6),
    '&:hover': {
      backgroundColor: darken(theme.palette.secondary.main, 0.5)
    },
    '&.Mui-selected': {
      backgroundColor: lighten(theme.palette.secondary.main, 0.1)
    },
  },
  mobileMenu: {
    backgroundColor: theme.palette.secondary.main,
    borderTopRightRadius: borderRadius,
    color: 'white'
  },
  mobileMenuHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  avatar: {
    height: theme.spacing(10),
    width: theme.spacing(10),
  },
  typography: {
    marginBottom: theme.spacing(1)
  },
  profilButton: {
    marginBottom: theme.spacing(1)
  },
}));

export default useStyles;
