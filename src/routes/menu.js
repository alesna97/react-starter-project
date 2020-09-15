const menu = [
  {
    title: 'Dashboard',
    link: '/dashboard',
    key: 'dashboard',
    icon: 'home_icon',
    breadcrumb: {
      '/dashboard': 'Dashboard'
    },
    subMenu: [
      {
        title: 'Dashboard',
        key: 'dashboard',
        link: '/dashboard',
        icon: 'lens',
        breadcrumb: {
          '/dashboard': 'Dashboard'
        },
      },
    ]
  },
];

export default menu;
