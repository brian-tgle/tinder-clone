import { lazy } from 'react';

const routeList = [
  {
    path: '/',
    component: lazy(() => import('../pages/home')),
    exact: true
  },
  {
    path: '/profile',
    component: lazy(() => import('../pages/profile')),
    exact: false
  }
];

export default routeList;

