import router from '@/router';

const actions = {
  async login({ dispatch }, { valid, user }) {
    if (valid) {
      await dispatch('auth/authenticate', {
        strategy: 'local',
        ...user,
      }, { root: true }).then(async () => {
        router.push('/users');
      }).catch(() => {
        throw new Error('Invalid Login');
      });
    }
  },
};

export default {
  namespaced: true,
  actions,
};
