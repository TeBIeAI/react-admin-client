import React from 'react';

const lazyLoadRoute = (routePath) => {
  return React.lazy(() => import(`@/pages${routePath}`))
}

const basicRouterMap = [
  {
    title: 'login',
    path: '/login',
    component: lazyLoadRoute('/login')
  },
  {
    title: 'test',
    path: '/test',
    component: lazyLoadRoute('/test')
  },
  {
    title: '404',
    path: '/404',
    component: lazyLoadRoute('/PageNotFound')
  },
];

const adminRouterMap = [
  { title: '首页', path: '/admin/dashboard', component: lazyLoadRoute('/index/index'), exact: true, },
  { title: '用户', path: '/admin/user/list', component: lazyLoadRoute('/user/list'), exact: true, },
  { title: '角色', path: '/admin/role/list', component: lazyLoadRoute('/role'), exact: true, },
]

export {
  basicRouterMap,
  adminRouterMap
};


