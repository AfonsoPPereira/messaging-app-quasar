<template>
  <q-dialog
    v-model="dialog"
    width="500"
    @keydown.esc.prevent="minimizeWindow"
    open-on-focus
    persistent
    scrollable>
    <template v-slot:activator="{ on, attrs }">
      <q-btn class="primary" dark v-bind="attrs" v-on="on" @click="openDialog">Chat</q-btn>
    </template>
    <q-card>
      <q-system-bar height="60" class="mb-1">
          <q-avatar size="40" class="mr-3 mb-1 mt-1">
            <img
              :src="targetUser.imageUrl"
              :alt="targetUser.displayName"
            >
          </q-avatar>
        <h3>
          <b>
            {{ targetUser.displayName }}
          </b>
        </h3>
        <q-spacer></q-spacer>
        <q-btn icon @click="minimizeWindow" small>
          <q-icon small>mdi-minus</q-icon>
        </q-btn>
        <q-btn icon @click="dialog = false;" small>
          <q-icon small>mdi-close</q-icon>
        </q-btn>
      </q-system-bar>
      <q-card-text id="chat">
        <Message v-for="(currMessage, index) in allMessages" :key="currMessage._id"
          :isCurrentUser="user.user._id === currMessage.userId"
          :message="currMessage.message"
          :timestamp="currMessage.createdAt"
          :timestampShown="processTimestamps(currMessage, index, allMessages)">
        </Message>
      </q-card-text>
      <q-divider></q-divider>
      <q-card-actions>
        <q-container
          fluid>
          <q-form
            @submit.prevent="sendMessage" class="row">
            <q-text-field
              label="Message"
              v-model.trim="message.message"
              class="ml-3"
              clear-icon="mdi-close-circle"
              clearable
              :counter="200"
              autofocus></q-text-field>
            <q-btn class="mx-2 mt-4" icon color="primary"
              type="submit" :disabled="!message.message">
              <q-icon large>mdi-send-circle-outline</q-icon>
            </q-btn>
          </q-form>
        </q-container>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Message from './Message.vue';

export default {
  name: 'ModalMessage',
  components: {
    Message,
  },
  props: ['targetUser'],
  mounted() {
    this.findMessages();
  },
  data() {
    return {
      dialog: false,
      message: {
        targetIds: [this.targetUser._id],
        message: '',
      },
    };
  },
  watch: {
    dialog(val) {
      if (val) this.$emit('removeMinimizedChat', this.targetUser);
    },
  },
  methods: {
    ...mapActions('messages', { findMessages: 'find' }),
    openDialog() {
      if (!this.dialog) this.dialog = true;
    },
    minimizeWindow() {
      if (this.dialog) {
        this.dialog = false;
        this.$emit('addMinimizedChat', this.targetUser);
      }
    },
    sendMessage() {
      if (this.dialog && this.message.message) {
        const newMessage = new Message(this.message);
        newMessage.save()
          .catch(() => {});
      }

      this.message.message = '';
    },
    processTimestamps(currMessage, index, allMessages) {
      return index < allMessages.length - 1
        ? allMessages[index + 1].userId !== currMessage.userId : true;
    },
  },
  computed: {
    ...mapState('auth', { user: 'payload' }),
    ...mapGetters('messages', { findMessagesInStore: 'find' }),
    allMessages() {
      return this.findMessagesInStore({
        query: {
          $or: [
            {
              targetIds: { $in: this.targetUser._id },
              userId: { $eq: this.user.user._id },
            },
            {
              targetIds: { $in: this.user.user._id },
              userId: { $eq: this.targetUser._id },
            },
          ],
          $sort: {
            createdAt: 1,
          },
        },
      }).data;
    },
  },
};
</script>

<style scoped>
  #chat::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
  }

  #chat::-webkit-scrollbar {
    width: 10px;
  }

  #chat::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #CCCAC4;
  }
</style>
