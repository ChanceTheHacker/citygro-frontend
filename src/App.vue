<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-sq1uare</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar app clipped-left flat height="72">
      <v-spacer></v-spacer>

      <v-responsive max-width="156">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
        ></v-text-field>
      </v-responsive>
    </v-app-bar>

    <v-navigation-drawer clipped v-model="drawer" app width="300">
      <v-list shaped>
        <v-list-item
          v-for="item in items"
          :key="item.convoId"
          :to="item.to"
          @click="setActiveConvo(item.click)"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app color="transparent" height="72" inset>
      <v-text-field
        v-model="text"
        background-color="grey lighten-1"
        dense
        flat
        hide-details
        rounded
        solo
      ></v-text-field>
    </v-footer>
  </v-app>
</template>

<script>
import store from "./store/index";

export default {
  data: () => ({
    drawer: null,
    text: "",
    items: [
      // { title: "Home", icon: "mdi-message-text", to: "/" },
      {
        title: "New Message",
        icon: "mdi-message-plus",
        to: "/new-message",
        convoId: "0",
        click: "0",
      },
      // { title: "About", icon: "mdi-message-alert", to: "/about" },
      // { title: "Login", icon: "mdi-message-text", to: "/login" },
    ],
  }),
  created: async function() {
    const conversations = await this.getConversations();
    const array = [];
    for (const convoId in conversations) {
      const newItem = {};
      newItem.title = conversations[convoId].messages[0].nickname;
      newItem.icon = "mdi-message-text";
      newItem.to = "/";
      newItem.convoId = convoId;
      newItem.click = convoId;
      array.push(newItem);
    }
    this.items = this.items.concat(array);
  },
  methods: {
    async getConversations() {
      return store.getters.getConversations;
    },
    setActiveConvo: async function(info) {
      if (info !== "0") {
        store.dispatch("setActiveConvo", info);
      }
    },
  },
  // computed: {
  //   async setActiveConvo(info) {
  //     if (info !== "0") {
  //       store.dispatch("setActiveConvo", info);
  //     }
  //   },
  // },
};
</script>

<style scoped>
.mdi-message-alert::before {
  color: red;
}
</style>
