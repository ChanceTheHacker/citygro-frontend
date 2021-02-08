<template>
  <div class="home">
    <v-list class="list" shaped dense>
      <v-list-item
        v-for="message in messages"
        :key="message.tracking"
        :style="isLeft(message.to_phone)"
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
  data: () => ({
    // messages: [],
  }),
  created: function() {
    this.initialize(),
      this.setMessages(),
      (this.autoSync = setInterval(() => this.syncMessages(), 15000));
  },
  computed: {
    activeConvo() {
      return store.state.activeConvo;
    },
    messages() {
      const { conversations, activeConvo } = store.state;
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
        // this.messages = data.conversations[data.activeConvo].messages;
        messages();
      } catch (err) {
        console.log(err);
      }
    },
    syncMessages: async function() {
      try {
        const data = await store.dispatch("syncMessages");
        // if (data) this.messages = data.conversations[data.activeConvo].messages;
        messages();
        console.log("synced");
      } catch (err) {
        console.log(err);
      }
    },
    setMessages: async function() {},
    isLeft: async function(phone) {
      if (phone === "16178551376") {
        return { width: "60%" };
      } else {
        return { width: "60%", marginLeft: "40%" };
      }
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
</style>
