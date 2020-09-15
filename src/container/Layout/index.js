import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import menu from '../../routes/menu';
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

const Layout = (props) => {
  const { children } = props;
  const [breadrumbs, setBreadcrumbs] = useState(mapBreadcrumbs());
  const [title, setTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    const to = pathname.replace('/app', '');

    setTitle(`${application.name} - ${breadrumbs[to]}`);
  }, [breadrumbs, location, title]);

  return (
    <Fragment>
      <Sidebar>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
        </Helmet>
        { children }
      </Sidebar>
    </Fragment>
  );
};

export default Layout;
