import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Paper,
  MenuItem,
  Menu,
  Icon,
  withStyles,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './appbar-jss';
import application from '../../config/application';
import logo from '../../assets/icon/logo.png';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    minWidth: 340,
    borderRadius: 10,
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const onClickSignOut = () => {
  localStorage.clear();
  window.location = '/login';
};

const Header = ({
  mainMenu, open, setMobileMenuOpen, mobileMenuOpen,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuDekstop = () => (
    <StyledMenu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      className={classes.menuDekstop}
    >
      <StyledMenuItem onClick={handleClose} className={classes.menuItem}>
        <ListItemIcon>
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Profile" secondary="Lihat dan Ubah Profil" />
      </StyledMenuItem>
      <StyledMenuItem onClick={handleClose} className={classes.menuItem}>
        <ListItemIcon>
          <Avatar>
            <Icon>menu</Icon>
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Menu" secondary="Lorem Ipsum blablabla" />
      </StyledMenuItem>
      <StyledMenuItem onClick={handleClose} className={classes.menuItem}>
        <ListItemIcon>
          <Avatar>
            <Icon>settings_icon</Icon>
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Pengaturan" secondary="Pengaturan Sistem" />
      </StyledMenuItem>

      <div className={classes.signOutButton}>
        <Button color="primary" variant="outlined" onClick={onClickSignOut}>
          Sign Out
        </Button>
      </div>
    </StyledMenu>
  );

  return (
    <AppBar
      position="fixed"
      color="#FFFFFF"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar className={classes.toolBar}>
        <div className={classes.menuIcon}>
          <IconButton 
            className={classes.menuIcon} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <div className={clsx(classes.toolbarTitle, {
          [classes.toolbarTitleShift]: open,
        })}
        >
          <Typography variant="h6" noWrap style={{ fontWeight: 'bold' }}>
            {mainMenu}
          </Typography>
        </div>
        <div className={classes.mobileTitle}>
          <img src={logo} alt="logo" height="60" />
        </div>
        <div className={classes.notificationIcon}>
          <IconButton>
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon color="primary" fontSize="large" className={classes.notificationIconMobile} />
            </Badge>
          </IconButton>
        </div>
        <Typography className={classes.typography}>
          Hi, Admin.
        </Typography>
        <IconButton onClick={handleClick} className={classes.avatarIcon}>
          <Avatar alt="avatar" className={classes.avatar} />
        </IconButton>
        {menuDekstop()}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = ({
  mainMenu: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  mobileMenuOpen: PropTypes.bool.isRequired,
  setMobileMenuOpen: PropTypes.func.isRequired,
});

export default Header;
