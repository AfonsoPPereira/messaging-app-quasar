<template>
  <q-container fluid>
    <q-alert v-if="errorMsg" type="error">
      {{ errorMsg }}
    </q-alert>
    <q-slide-y-transition mode="out-in">
      <q-layout column align-center>
        <q-form
          v-if="!loading"
          v-model="valid"
          @submit.prevent="signUp"
          @keydown.prevent.enter>
          <q-text-field
            v-model="user.username"
            :rules="notEmptyRules"
            label="Username"
            @input="clearError"
            required
          ></q-text-field>
          <q-text-field
            v-model="user.displayName"
            :rules="notEmptyRules"
            label="Display Name"
            required
          ></q-text-field>
          <q-text-field
            v-model="user.password"
            :rules="notEmptyRules"
            label="Password"
            type="password"
            required
          ></q-text-field>
          <q-text-field
            v-model="user.confirmPassword"
            :rules="confirmPasswordRules"
            label="Confirm Password"
            type="password"
            required
          ></q-text-field>
          <q-text-field
            v-model="user.imageUrl"
            :rules="notEmptyRules"
            label="Image URL"
            required
          ></q-text-field>
          <q-btn type="submit" :disabled="!valid">SignUp</q-btn>
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
import { mapState } from 'vuex';
import { notEmptyRules } from '@/validators';

export default {
  name: 'signUp',
  data: (vm) => ({
    valid: false,
    errorMsg: '',
    user: {
      username: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      imageUrl: '',
    },
    notEmptyRules,
    confirmPasswordRules: [(confirmPassword) => confirmPassword === vm.user.password || 'Password must match.'],
  }),
  computed: {
    ...mapState('users', { loading: 'isCreatePending' }),
  },
  methods: {
    signUp() {
      if (this.valid) {
        const { User } = this.$FeathersVuex;
        const user = new User(this.user);
        user.save()
          .then(() => {
            this.$router.push({ name: 'login', params: { successMsg: 'Successfully registered' } });
          })
          .catch((error) => {
            this.errorMsg = error;
          });
      }
    },
    clearError() {
      this.errorMsg = '';
    },
  },
};
</script>
