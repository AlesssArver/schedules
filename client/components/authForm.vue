<template>
  <v-card max-width="450">
    <v-container>
      <v-row>
        <v-spacer />
        <v-col class="text-center">
          <v-card-title v-if="register">Register</v-card-title>
          <v-card-title v-if="login">Login</v-card-title>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-form v-model="valid" ref="form">
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    type="email"
                    placeholder="Email"
                    required
                    outlined
                    rounded
                    dense
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="showPassword ? 'text' : 'password'"
                    counter
                    @click:append="showPassword = !showPassword"
                    placeholder="Password"
                    required
                    outlined
                    rounded
                    dense
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-spacer />
                <v-col>
                  <v-btn
                    v-if="register"
                    @click.prevent="registerForm"
                    :disabled="!valid"
                    rounded
                    depressed
                    >Register</v-btn
                  >
                  <v-btn
                    v-if="login"
                    @click.prevent="loginForm"
                    :disabled="!valid"
                    rounded
                    depressed
                    >Login</v-btn
                  >
                </v-col>
                <v-spacer />
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-col class="text-center">
          <a href="#" v-if="register" @click="openLogin">Login</a>
          <a href="#" v-if="login" @click="openRegister">Register</a>
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    login: false,
    register: true,
    validMessage: "",
    valid: false,
    showPassword: false,
    email: "",
    password: "",
    emailRules: [
      value => !!value || "Required.",
      v => /.+@.+/.test(v) || "E-mail must be valid",
      v =>
        /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
          v
        ) || "Uncorrect email",
      value => (value && value.length >= 3) || "Min 3 characters"
    ],
    passwordRules: [
      value => !!value || "Password is required.",
      v => v.length >= 8 || "Min 8 characters"
    ]
  }),
  methods: {
    openLogin() {
      this.register = false;
      this.login = true;
    },
    openRegister() {
      this.register = true;
      this.login = false;
    },
    async registerForm() {
      try {
        if (this.valid) {
          await this.$store.dispatch("register", {
            email: this.email,
            password: this.password
          });
          await this.$refs.form.resetFields();
          this.$router.push("/schedules");
        } else this.validMessage = "Please, entry your data correctly";
      } catch (e) {
        this.error = e.message;
      }
    },
    async loginForm() {
      try {
        if (this.valid) {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password
          });
          await this.$refs.form.reset();
          this.$router.push("/schedules");
        } else this.validMessage = "Please, entry your data correctly";
      } catch (e) {
        this.error = e.message;
      }
    }
  }
};
</script>
