<template>
  <v-container class="" fluid>
    <!-- UserInfo Card -->
    <v-row align="" justify="center">
      <v-col col="12" sm="8" md="12">
        <v-card v-if="$auth.user">
          <v-card-title primary-title>
            User Profile
          </v-card-title>
          <v-card-text>
            Email: <span>{{ $auth.user.email }}</span> <br />
            Role: <span>{{ $auth.user.role.name }}</span>
          </v-card-text>

          <v-card-actions>
            <v-btn flat color="primary" @click="doLogout">Logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- login UI -->
    <v-row v-if="!$auth.user" align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" flat>
            <v-toolbar-title>Sign In</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="login.identifier"
                label="Email or Username"
                name="login"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>

              <v-text-field
                id="password"
                v-model="login.password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
              <nuxt-link to="/iam/forgotme">forgot password</nuxt-link>
            </v-form>
          </v-card-text>

          <v-card-actions class="d-flex flex-column">
            <v-btn block flat color="primary" @click="doLogin">Login</v-btn>

            <div class="my-2">Or</div>

            <v-btn block to="/iam/register" flat color="primary"
              >Register</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- Notification -->
    <v-snackbar v-model="snackbar" top>
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    login: {
      identifier: '',
      password: '',
    },
    info: 'anonny',
    snackbar: false,
    text: 'Wrong Email or Password!',
  }),
  computed: {},
  methods: {
    async doLogin() {
      try {
        const resp = await this.$auth
          .loginWith('local', { data: this.login })
          .then(() => this.$store.dispatch('context/getUserProfile'))
        this.info = resp
      } catch (err) {
        this.snackbar = true
      }
    },
    doLogout() {
      this.$auth.logout()
    },
  },
}
</script>
