/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import _ from 'lodash';
import application from '../../config/application';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3)
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  typography: {
    fontSize: 12
  }
}));

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

export default function RouterBreadcrumbs(props) {
  const { breadcrumbNameMap } = props;
  const classes = useStyles();

  return (
      <Paper className={classes.root}>
        <Route>
          {({ location }) => {
            const pathnames = location.pathname.split('/').filter((x) => x);
            const cleanPathnames = _.pull(pathnames, 'app')
            return (
              <Breadcrumbs aria-label="breadcrumb" separator=">">
                <LinkRouter color="inherit" to="/app/dashboard" className={classes.typography}>
                  GCDA SISCAB
                </LinkRouter>
                {cleanPathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;  
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            
                  return last ? (
                    <Typography color="textPrimary" key={to} className={classes.typography}>
                      {breadcrumbNameMap[to]}
                    </Typography>
                  ) : (
                    <LinkRouter color="inherit" className={classes.typography} to={`${application.privatePath}${to}`} key={to}>
                      {breadcrumbNameMap[to]}
                    </LinkRouter>
                  );
                })}
              </Breadcrumbs>
            );
          }}
        </Route>
      </Paper>
  );
}