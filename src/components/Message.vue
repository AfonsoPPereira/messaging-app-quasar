<template>
  <div class="d-flex mb-1" :class="isCurrentUser ? 'flex-row-reverse' : ''">
      <q-card
        @click="toggleTimestamp = !toggleTimestamp"
        class="pa-3 text-body-1 rounded-card"
        :class="isCurrentUser ? 'primary text-right ml-2' : 'text-left mr-2'"
        style="max-width: 50%; height: auto;"
      >
        {{ message }}
      </q-card>
      <transition name="fade">
        <div v-if="toggleTimestamp" class="caption align-self-end">{{ formattedDate }}</div>
      </transition>
  </div>
</template>

<style scoped>
  .rounded-card {
    border-radius: 40px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<script>
import dateFormat from 'dateformat';

export default {
  name: 'Message',
  props: ['isCurrentUser', 'message', 'timestamp', 'timestampShown'],
  data() {
    return {
      toggleTimestamp: this.timestampShown,
    };
  },
  computed: {
    formattedDate() {
      const date = new Date(this.timestamp);
      return dateFormat(date, 'dd/mm/yyyy hh:MM:ss');
    },
  },
};
</script>
