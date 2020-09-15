/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Paper, Tooltip, Collapse, Avatar, Button } from '@material-ui/core';
import _ from 'lodash';
import Icon from '@material-ui/core/Icon';
import { Link, useLocation, useHistory } from 'react-router-dom';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import useStyles from './useStyles';
import menu from '../../routes/menu';
import Footer from '../Footer';
import CustomIcon from '../icon';
import Header from '../Header';
import RouterBreadcrumbs from '../RouterBreadcrumbs';
import application from '../../config/application';

const mapBreadcrumbs = () => {
  const breadcrumb = {};

  _.map(menu, (item) => {
    if (item.breadcrumb) {
      _.assign(breadcrumb, item.breadcrumb);
    }

    if (item.subMenu) {
      _.map(item.subMenu, (subItem) => _.assign(breadcrumb, subItem.breadcrumb)
      );
    }
  });

  return breadcrumb;
};

const Sidebar = (props) => {
  const classes = useStyles();
  const { children } = props;
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState();
  const [subSelectedIndex, setSubSelectedIndex] = useState();
  const [subMenu, setSubMenu] = useState(menu[0].subMenu);
  const [mainMenu, setMainMenu] = useState(application.name);
  const [breadrumbs, setBreadcrumbs] = useState(mapBreadcrumbs());
  const [nestedOpen, setNestedOpen] = useState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const history = useHistory();

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleListItemClick = (event, key, type, index) => {
    switch (type) {
      case 'main': {
        setSelectedIndex(key);
        setSubMenu(menu[_.findKey(menu, ['key', key])].subMenu);
        setMainMenu(menu[index].title);
        break;
      }
      case 'sub': {
        setSubSelectedIndex(key);
      }
    }
  };

  useEffect(() => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const cleanPathnames = _.pull(pathnames, 'app');

    try {
      setSelectedIndex(cleanPathnames[0]);
      setSubMenu(menu[_.findKey(menu, ['key', cleanPathnames[0]])].subMenu);
      setMainMenu(menu[_.findKey(menu, ['key', cleanPathnames[0]])].title);
      setSubSelectedIndex(cleanPathnames[1]);
    } catch (error) {
      // history.goBack();
    }
  }, [location.pathname]);

  const toggleMobileMenu = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setMobileMenuOpen(open);
  };

  const renderMobileDrawer = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={toggleMobileMenu(false)}
      classes={{ paper: classes.mobileMenu }}
    >
      <div className={classes.mobileMenuHeader}>
        <IconButton>
          <Avatar alt="avatar" className={classes.avatar} />
        </IconButton>
        <Typography className={classes.typography}>
          Hi, Admin.
        </Typography>
        <Button
          variant="outlined"
          className={classes.profilButton}
          size="small"
          onClick={() => {
            localStorage.clear();
            window.location = '/login';
          }}
        >
          sign out
        </Button>
      </div>
      <Divider />
      <List>
        {
          _.map(menu, (item, key) => (
            <div>
              <ListItem
                button
                className={classes.listItemMobile}
                key={key}
                onClick={() => setNestedOpen(key)}
              >
                <ListItemIcon>
                  <Icon style={{ color: 'white' }}>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                />
                {nestedOpen === key ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={nestedOpen === key} timeout="auto" unmountOnExit key={key}>
                <List component="div" disablePadding>
                  {
                    _.map(item.subMenu, (subItem, key) => (
                      <ListItem
                        key={key}
                        button
                        className={classes.nested}
                        component={Link}
                        to={`${application.privatePath}${subItem.link}`}
                        onClick={toggleMobileMenu(false)}
                      >
                        <ListItemIcon>
                          <Icon style={{ color: 'white', fontSize: 6 }}>
                            {subItem.icon}
                          </Icon>
                        </ListItemIcon>
                        <ListItemText primary={subItem.title} />
                      </ListItem>
                    )
                    )
                  }
                </List>
              </Collapse>
            </div>
          )
          )
        }
      </List>
    </Drawer>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        open={open}
        mainMenu={mainMenu}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />
      <Paper
        className={classes.drawer2}
      >
        <div className={classes.menuIcon}>
          <IconButton onClick={handleDrawer}>
            {
              open
                ? <img src={CustomIcon.close_menu} alt="close" />
                : <img src={CustomIcon.open_menu} alt="open" />
            }
          </IconButton>
        </div>
        <Divider />
        <List>
          {
            _.map(menu, (item, index) => (
              <ListItem
                button
                key={index}
                className={classes.list}
                selected={selectedIndex === item.key}
                onClick={(event) => handleListItemClick(event, item.key, 'main', index)}
                component={Link}
                to={`${application.privatePath}${item.link}`}
              >
                <Tooltip title={item.title} placement="right-end">
                  <Icon className={classes.icon}>{item.icon}</Icon>
                </Tooltip>
              </ListItem>
            )
            )
          }
        </List>
      </Paper>
      <Drawer
        variant="permanent"
        className={clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {mainMenu}
        </div>
        <Divider />
        <List style={{ marginLeft: 30 }}>
          {
            _.map(subMenu, (item, key) => (
              <ListItem
                className={classes.submenu}
                button
                key={key}
                selected={subSelectedIndex === item.key}
                onClick={(event) => handleListItemClick(event, item.key, 'sub', key)}
                component={Link}
                to={`${application.privatePath}${item.link}`}
              >
                <ListItemIcon
                  style={{
                    minWidth: 26
                  }}
                >
                  <Icon
                    className={classes.icon}
                    style={{ fontSize: 8 }}
                  >
                    {item.icon}
                  </Icon>
                </ListItemIcon>
                <ListItemText className={classes.submenuTitle}>
                  <Typography style={{ fontSize: 13 }}>
                    {item.title}
                  </Typography>
                </ListItemText>
              </ListItem>
            )
            )
          }
        </List>
      </Drawer>
      {renderMobileDrawer()}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <RouterBreadcrumbs breadcrumbNameMap={breadrumbs} />
        <div className={classes.mainContent}>
          { children }
        </div>
      </main>
      <Footer open={open} />
    </div>
  );
};

export default Sidebar;
