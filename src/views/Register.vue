<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Registration</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="email"
              label="Email"
              :rules="[v => !!v.trim() || 'Email is required']"
              prepend-icon="email"
              type="text"
            />

            <v-text-field
              v-model="password"
              :rules="[
                v => !!v.trim() || 'Password is required',
                v =>
                  (v && v.length <= 6) ||
                  'Password must be less than 6 characters'
              ]"
              label="Password"
              prepend-icon="lock"
              type="password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <span>
            Already have an account?
            <router-link :to="'/login'">
              Login
            </router-link>
          </span>
          <v-spacer />
          <v-btn
            color="primary"
            @click.prevent="submitHandler"
            :loading="loading"
          >
            Register
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    email: "",
    password: "",
    loading: false
  }),
  methods: {
    async submitHandler() {
      if (!this.$refs.form.validate()) {
        return;
      }

      try {
        this.loading = true;
        await this.$store.dispatch("register", {
          email: this.email,
          password: this.password
        });
        this.loading = false;
        this.$router.push("/");
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }
  }
};
</script>
