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
      <v-form @submit="sendMsg">
        <v-text-field
          v-model="sms"
          :error-messages="smsErrors"
          :counter="160"
          required
          label=""
          background-color="grey lighten-1"
          dense
          flat
          hide-details
          rounded
          solo
        ></v-text-field>
        <v-btn type="submit">
          Send
        </v-btn>
      </v-form>
    </v-footer>
  </v-app>
</template>

<script>
import store from "./store/index";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    sms: { required, maxLength: maxLength(160) },
  },
  data: () => ({
    drawer: null,
    sms: "",
  }),
  methods: {
    async sendMsg() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        console.log("broken");
      } else {
        // do your submit logic here
        this.submitStatus = "PENDING";
        const data = {
          // nickname: this.name,
          to: this.activeConvo,
          message: this.sms,
        };
        const success = await store.dispatch("attemptSendMsg", data);
        if (success) {
          this.submitStatus = "OK";
          this.clear();
          store.dispatch("syncMessages");
        } else {
          this.submitStatus = "ERROR";
        }
      }
    },
    setActiveConvo: async function(info) {
      if (info !== "0") {
        store.dispatch("setActiveConvo", info);
      }
    },
    clear() {
      this.$v.$reset();
      this.sms = "";
    },
  },
  computed: {
    activeConvo() {
      return store.state.activeConvo;
    },
    smsErrors() {
      const errors = [];
      if (!this.$v.sms.$dirty) return errors;
      !this.$v.sms.maxLength && errors.push("Can not exceed 160 characters");
      !this.$v.sms.required && errors.push("Message is required");
      return errors;
    },
    items() {
      const { conversations } = store.state;
      const newArray = [];
      const initialArray = [
        {
          title: "New Message",
          icon: "mdi-message-plus",
          to: "/new-message",
          convoId: "0",
          click: "0",
        },
      ];
      // loop conversations and add them to a new array
      if (!conversations.default) {
        for (const convoId in conversations) {
          const newItem = {};
          newItem.title = conversations[convoId].messages[0].nickname;
          newItem.icon = "mdi-message-text";
          newItem.to = "/";
          newItem.convoId = convoId;
          newItem.click = convoId;
          newArray.push(newItem);
        }
      }

      return initialArray.concat(newArray);
    },
  },
};
</script>

<style scoped>
.mdi-message-alert::before {
  color: red;
}
</style>
