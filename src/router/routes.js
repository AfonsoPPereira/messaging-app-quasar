import store from '../store';

function isLoggedIn(to, from, next) {
  store.dispatch('auth/authenticate').then(() => {
    next();
  }).catch(() => {
    next('/login');
  });
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('pages/Home.vue'),
    beforeEnter(to, from, next) {
      store.dispatch('auth/authenticate').then(() => {
        next('/users');
      }).catch(() => {
        next('/login');
      });
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('pages/SignUp.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('pages/Users.vue'),
    beforeEnter: isLoggedIn,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
