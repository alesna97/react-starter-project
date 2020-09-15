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
  {
    title: 'Data Nasabah',
    link: '/customer/individual',
    key: 'customer',
    icon: 'person',
    breadcrumb: {
      '/customer': 'Data Nasabah'
    },
    subMenu: [
      {
        title: 'Perorangan',
        key: 'individual',
        link: '/customer/individual',
        icon: 'lens',
        breadcrumb: {
          '/customer/individual': 'Perorangan'
        },
      },
      {
        title: 'Perusahaan',
        key: 'companies',
        link: '/customer/companies',
        icon: 'lens',
        breadcrumb: {
          '/customer/companies': 'Perusahaan'
        },
      },
    ]
  },
  {
    title: 'Manajemen Parameter',
    link: '/transaction/individual',
    key: 'transaction',
    icon: 'receipt',
    breadcrumb: {
      '/transaction': 'Transaksi'
    },
    subMenu: [
      {
        title: 'Perorangan',
        link: '/transaction/individual',
        key: 'individual',
        icon: 'lens',
        breadcrumb: {
          '/transaction/individual': 'Perorangan'
        },
      },
      {
        title: 'Perusahaan',
        link: '/transaction/companies',
        key:'companies',
        icon: 'lens',
        breadcrumb: {
          '/transaction/companies': 'Perusahaan'
        },
      },
    ]
  },
  {
    title: 'Finansial Manajemen',
    link: '/financial-management/transaction-reports',
    key: 'financial-management',
    icon: 'money',
    breadcrumb: {
      '/financial-management': 'Finansial Manajemen'
    },
    subMenu: [
      {
        key: 'permintaan',
        title: 'Permintaan',
        link: '/financial-management/permintaan',
        icon: 'lens',
        breadcrumb: {
          '/financial-management/permintaan': 'Permintaan'
        },
      },
      {
        key: 'transaction-reports',
        title: 'Laporan Transaksi',
        link: '/financial-management/transaction-reports',
        icon: 'lens',
        breadcrumb: {
          '/financial-management/transaction-reports': 'Laporan Transaksi'
        },
      },
      {
        key: 'pembukuan',
        title: 'Pembukuan',
        link: '/financial-management/pembukuan',
        icon: 'lens',
        breadcrumb: {
          '/financial-management/pembukuan': 'Pembukuan'
        },
      },
      {
        key: 'jurnal',
        title: 'Jurnal',
        link: '/financial-management/jurnal',
        icon: 'lens',
        breadcrumb: {
          '/financial-management/jurnal': 'Jurnal'
        },
      }
    ]
  }
];

export default menu;