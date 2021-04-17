const menuMap = [
  {
    title: '首页',
    path: '/admin/dashboard',
    roles: ['admin'],
  },
  {
    title: '权限',
    path: '/admin',
    children: [
      {
        title: '用户',
        path: '/admin/user/list',
        roles: ['admin'],
      },
      {
        title: '角色',
        path: '/admin/role/list',
        roles: ['admin'],
      },
    ]
  },
];

export default menuMap;


