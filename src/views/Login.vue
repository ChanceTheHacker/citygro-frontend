<template>
  <v-form @submit="login">
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="pwErrors"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show ? 'text' : 'password'"
      required
      label="Password"
      :counter="8"
      @click:append="show = !show"
    ></v-text-field>

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
import { required, minLength, email } from "vuelidate/lib/validators";
import store from "../store/index";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
  },

  data: () => ({
    email: "",
    password: "",
    show: false,
  }),
  created: function() {
    this.wakeUpHeroku();
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    pwErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.minLength && errors.push("Must be 8 characters");
      !this.$v.email.required && errors.push("Password is required");
      return errors;
    },
  },

  methods: {
    async login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        this.submitStatus = "PENDING";
        const data = { email: this.email, password: this.password };
        const success = await store.dispatch("attemptLogin", data);
        if (success) {
          this.submitStatus = "OK";
          // router.push("/");
          router.push("/");
        } else {
          this.submitStatus = "ERROR";
        }
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.password = "";
    },
    wakeUpHeroku: async function() {
      try {
        const res = await fetch(`https://chat-demo-db.herokuapp.com/`);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
