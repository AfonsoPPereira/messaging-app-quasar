<template>
  <q-layout justify-content align-center>
    <h3 class="mr-2">{{user.displayName}}</h3>
        <q-avatar
          :size="40"
          color="grey lighten-4"
          clickable
        >
          <img :src="user.imageUrl" alt="avatar">
        </q-avatar>
  </q-layout>
</template>

<script>
export default {
  props: ['user'],
};
</script>
