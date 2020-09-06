<template>
  <q-container fluid>
      <q-slide-y-transition mode="out-in">
        <q-layout row align-center wrap>
          <q-progress-circular v-if="0" :size="70"
            :width="7" indeterminate color="primary"></q-progress-circular>
          <q-list shaped>
            <q-subheader>All Users ({{ sortedUsers.length }})</q-subheader>
            <q-list-item-group color="primary">
              <q-list-item v-for="curr_user in sortedUsers" :key="curr_user._id">
                <q-row>
                  <q-col cols="2">
                    <q-list-item-icon>
                      <q-icon :color="curr_user.online ? 'green' : 'red'">mdi-account</q-icon>
                    </q-list-item-icon>
                  </q-col>
                  <q-list-item-content>
                    <q-col cols="5">
                      <q-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <q-list-item-title
                            v-text="curr_user.displayName"
                            v-bind="attrs"
                            v-on="on"
                            :class="user.user._id === curr_user._id ? 'font-weight-black' : ''"
                          ></q-list-item-title>
                        </template>
                        <span>{{ curr_user.displayName }}</span>
                      </q-tooltip>
                    </q-col>
                    <q-col cols="7">
                      <ModalMessage
                        @addMinimizedChat="addChat"
                        @removeMinimizedChat="removeChat"
                        :ref="curr_user._id"
                        v-if="user.user._id !== curr_user._id"
                        :targetUser="curr_user">
                      </ModalMessage>
                    </q-col>
                  </q-list-item-content>
                </q-row>
              </q-list-item>
            </q-list-item-group>
          </q-list>
        </q-layout>
      </q-slide-y-transition>
        <div class="d-flex align-end flex-column"
          style="position: fixed; bottom: 40px; right: 30px;">
          <MinimizedChat
            v-for="chat in usersChat"
            :key="chat._id"
            :user="chat"
            @removeMinimizedChat="removeChat">
          </MinimizedChat>
        </div>
  </q-container>
</template>

<script>
/* eslint-disable import/no-unresolved */
import { mapState, mapGetters, mapActions } from 'vuex';
import ModalMessage from '../components/ModalMessage.vue';
import MinimizedChat from '../components/MinimizedChat.vue';

export default {
  name: 'users',
  components: {
    ModalMessage,
    MinimizedChat,
  },
  mounted() {
    this.findUsers();
    if (localStorage.usersChat) this.usersChat = JSON.parse(localStorage.usersChat);
  },
  watch: {
    usersChat(newVal) {
      localStorage.usersChat = JSON.stringify(newVal);
    },
  },
  data() {
    return {
      usersChat: [],
    };
  },
  methods: {
    ...mapActions('users', { findUsers: 'find' }),
    addChat(userObj) {
      this.usersChat.push(userObj);
    },
    removeChat(userObj) {
      const userIndex = this.usersChat.findIndex((item) => item._id === userObj._id);
      if (userIndex !== -1) this.usersChat.splice(userIndex, 1);
    },
  },
  computed: {
    ...mapState('auth', { user: 'payload' }),
    ...mapGetters('users', { findUsersInStore: 'find' }),
    sortedUsers() {
      if (this.user) {
        const allUsers = this.findUsersInStore().data;
        const userId = this.user.user._id;

        allUsers.sort((x, y) => {
          if (x._id === userId) return -1;
          if (y._id === userId) return 1;
          if (x.online && !y.online) return -1;
          if (!x.online && y.online) return 1;
          if (x.displayName > y.displayName) return 1;
          return -1;
        });
        return allUsers;
      }

      return [];
    },
  },
};
</script>
