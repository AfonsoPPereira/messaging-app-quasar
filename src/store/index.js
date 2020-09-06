import Vue from 'vue';
import Vuex from 'vuex';

import feathersVuex from './feathersVuex';

import localAuth from './localAuth';

const {
  service,
  auth,
  FeathersVuex,
} = feathersVuex;

Vue.use(Vuex);
Vue.use(FeathersVuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default new Vuex.Store({
  modules: {
    localAuth,
  },
  plugins: [
    service('users', {
      instanceDefaults: {
        online: false,
      },
    }),
    service('messages', {
      instanceDefaults: {
        status: 'sent',
        reaction: undefined,
      },
    }),
    auth({
      userService: 'users',
    }),
  ],
});
