<template>
  <q-header elevated class="bg-white text-black">
    <q-toolbar>
      <q-toolbar-title>
        <q-btn flat dense :to="{ name: 'home' }">Social Media</q-btn>
      </q-toolbar-title>
      <div v-if="!user">
        <q-btn class="q-mr-sm" color="primary" :to="{ name: 'login' }">Login</q-btn>
        <q-btn color="secondary" :to="{ name: 'signup' }">SignUp</q-btn>
      </div>
      <div v-if="user">
        <app-avatar :user="user.user"></app-avatar>
        <q-btn @click="logout">LogOut</q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import AppAvatar from '@/components/AppAvatar';

export default {
  props: ['user', 'logout'],
  components: {
    AppAvatar,
  },
};
</script>
