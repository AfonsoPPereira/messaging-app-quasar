<template>
  <q-container fluid>
    <q-alert v-if="errorMsg" type="error">
      {{ errorMsg }}
    </q-alert>
    <q-alert v-if="successMsg" type="success">
      {{ successMsg }}
    </q-alert>
    <q-slide-y-transition mode="out-in">
      <q-layout column align-center>
        <q-form
          v-if="!loading"
          v-model="valid"
          @submit.prevent="customLogin({ valid, user })"
          @keydown.prevent.enter>
          <q-text-field
            v-model="user.username"
            :rules="notEmptyRules"
            label="Username"
            @input="clearError"
            required
          ></q-text-field>
          <q-text-field
            v-model="user.password"
            :rules="notEmptyRules"
            label="Password"
            type="password"
            @input="clearError"
            required
          ></q-text-field>
          <q-btn type="submit" :disabled="!valid">Login</q-btn>
        </q-form>
        <q-progress-circular
          v-if="loading"
          :size="70"
          :width="7"
          indeterminate
          color="primary">
        </q-progress-circular>
      </q-layout>
    </q-slide-y-transition>
  </q-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { notEmptyRules } from '@/validators';

export default {
  name: 'login',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.params !== {} && to.params.successMsg) {
        vm.successMsg = to.params.successMsg;
      }

      next();
    });
  },
  data: () => ({
    valid: false,
    errorMsg: '',
    successMsg: '',
    user: {
      username: '',
      password: '',
    },
    notEmptyRules,
  }),
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
  },
  methods: {
    ...mapActions('localAuth', ['login']),
    async customLogin(obj) {
      this.successMsg = '';
      await this.login(obj).catch((error) => {
        this.errorMsg = error;
      });
    },
    clearError() {
      this.errorMsg = '';
    },
  },
};
</script>
