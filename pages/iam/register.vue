<template>
  <v-container grid-list-xs>
    <v-card class="pa-2">
      <v-card-title primary-title>
        <!-- Join our platform... -->
      </v-card-title>
      <v-row>
        <v-col cols="7">
          <div style="heigth: 600px;" class="d-flex flex-column align-center">
            <div class="text-h5 mb-4">
              Join the Omizar community
            </div>
            <div>
              <ul>
                <li>Save your cart</li>
                <li>Save your tags</li>
                <li>Many more benefits</li>
              </ul>
            </div>
          </div>
        </v-col>
        <v-col cols="5">
          <div>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="name"
                label="Username"
                :rules="nameRules"
                :counter="25"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="E-mail"
                :rules="emailRules"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="secret"
                label="password"
                :rules="secretRules"
                required
                outlined
                type="password"
              ></v-text-field>
              <v-text-field
                v-model="secret"
                label="Retype Password"
                required
                outlined
              ></v-text-field>

              <v-btn :disabled="!valid" @click="submit">
                submit
              </v-btn>
              <v-btn @click="clear">clear</v-btn>
            </v-form>
            {{ result }}
          </div>
          <v-snackbar v-model="snackbar" top>
            {{ text }}

            <template v-slot:action="{ attrs }">
              <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    secret: '',
    result: '',
    valid: true,
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    checkbox: false,
  }),

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        await this.$axios
          .$post('/newuser', {
            username: this.name,
            email: this.email,
            password: this.secret,
          })
          .then((response) => {
            this.result = response
          })
          .catch((error) => {
            this.result = error.response.data.message[0].messages[0].message
          })
      }
    },
    clear() {
      this.$refs.form.reset()
    },
  },
}
</script>
