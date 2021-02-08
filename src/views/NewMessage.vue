<template>
  <v-form @submit="sendMsg">
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="4"
      label="Contact's Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="phone"
      :error-messages="phoneErrors"
      :counter="11"
      label="Phone Number"
      required
      @input="$v.phone.$touch()"
      @blur="$v.phone.$touch()"
    ></v-text-field>
    <v-textarea
      v-model="message"
      :error-messages="messageErrors"
      :counter="160"
      label="Your Message"
      autocomplete
      required
      @keydown.enter.exact.prevent
      @keydown.enter.exact="sendMsg"
      @keydown.enter.shift.exact="newline"
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-textarea>

    <v-btn class="mr-4" type="submit">
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </v-form>
</template>

<script>
import router from "../router/index";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  numeric,
} from "vuelidate/lib/validators";
import store from "../store/index";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20) },
    phone: {
      required,
      numeric,
      maxLength: maxLength(11),
      minLength: minLength(11),
    },
    message: { required, maxLength: maxLength(160) },
  },

  data: () => ({
    name: "",
    phone: "",
    message: "",
  }),
  created: function() {},
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 20 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$error) return errors;
      !this.$v.phone.numeric &&
        errors.push("I can't dial letters, I did my best...");
      !this.$v.phone.maxLength &&
        errors.push("Phone can't be more than 11 digits");
      !this.$v.phone.required && errors.push("Phone is required");
      !this.$v.phone.minLength &&
        errors.push("Country code and Area code required");
      return errors;
    },
    messageErrors() {
      const errors = [];
      if (!this.$v.message.$dirty) return errors;
      !this.$v.message.maxLength &&
        errors.push("Can not exceed 160 characters");
      !this.$v.message.required && errors.push("Message is required");
      return errors;
    },
  },

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
          nickname: this.name,
          to: this.phone,
          message: this.message,
        };
        const success = await store.dispatch("attemptSendMsg", data);
        if (success) {
          this.submitStatus = "OK";
          router.push("/");
        } else {
          this.submitStatus = "ERROR";
        }
      }
    },
    newline() {
      this.value = `${this.value}\n`;
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.phone = "";
      this.message = "";
    },
  },
};
</script>

<style></style>
