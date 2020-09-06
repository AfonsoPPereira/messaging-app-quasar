<template>
  <q-tooltip left>
    <template v-slot:activator="{ on, attrs }">
      <q-badge
        overlap
        avatar
        icon="mdi-close"
        color="blue-grey lighten-3"
        style="cursor: pointer;"
        class="mt-4"
        v-model="hover"
        @mouseover.native="hover = true"
        @mouseleave.native="hover = false"
        @click.native="removeIcon">
        <q-avatar v-bind="attrs" v-on="on" @click.native="openWindow">
          <img :src="user.imageUrl" :alt="user.displayName" />
        </q-avatar>
      </q-badge>
    </template>
    <span>{{ user.displayName }}</span>
  </q-tooltip>
</template>

<script>
export default {
  name: 'MinimizedChat',
  props: ['user'],
  data() {
    return {
      toggleTimestamp: true,
      hover: false,
    };
  },
  methods: {
    openWindow() {
      this.$parent.$refs[this.user._id][0].dialog = true;
    },
    removeIcon() {
      this.$emit('removeMinimizedChat', this.user);
    },
  },
};
</script>
