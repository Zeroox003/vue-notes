<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" @submit.prevent="submitHandler" lazy-validation>
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

            <v-card-actions>
              <span>
                Have not an account?
                <router-link :to="'/register'">
                  Create
                </router-link>
              </span>
              <v-spacer />
              <v-btn type="submit" color="primary" :loading="loading">
                Login
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Login",
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
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password
        });
        // eslint-disable-next-line no-empty
      } catch (e) {}

      this.loading = false;
      this.$showMessage({ content: "You are logged in.", color: "success" });
    }
  }
};
</script>
