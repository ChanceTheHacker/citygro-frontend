<template>
  <div class="home">
    <v-list class="list" shaped dense>
      <v-list-item
        v-for="message in messages"
        :key="message.message"
        :class="{
          right: isMine(message.from_phone),
          left: isMine(message.to_phone),
        }"
      >
        <v-list-item-content>{{ message.message }} </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import store from "../store/index";

export default {
  name: "Home",
  components: {},
  data: () => ({}),
  created: function() {
    this.initialize(),
      (this.autoSync = setInterval(() => this.syncMessages(), 15000));
  },
  computed: {
    activeConvo() {
      return store.state.activeConvo;
    },
    messages() {
      const conversations = this.$store.getters.getConversations;
      const activeConvo = this.$store.getters.getActiveConvo;
      if (!conversations.default) {
        const messages = conversations[activeConvo].messages;
        return messages;
      } else return { messages: [] };
    },
  },
  methods: {
    initialize: async function() {
      try {
        const data = await store.dispatch("initialize");
      } catch (err) {
        console.log(err);
      }
    },
    syncMessages: async function() {
      try {
        const data = await store.dispatch("syncMessages");
        console.log("synced");
      } catch (err) {
        console.log(err);
      }
    },
    isMine: function(phone) {
      if (phone === "16178551376") {
        return true;
      } else return false;
    },
  },
  beforeDestroy() {
    clearInterval(this.autoSync);
  },
};
</script>

<style scoped>
.home {
  height: 100%;
  align-content: flex-end;
  flex-grow: 10;
  overflow-y: scroll;
}
.list {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: flex-end;
}

.left {
  width: 60%;
}

.right {
  width: 60%;
  margin-left: 40%;
}
</style>
