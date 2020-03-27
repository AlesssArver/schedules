<template>
  <v-app :light="lightTheme" :dark="!lightTheme">
    <v-content>
      <v-container>
        <v-row>
          <v-col v-if="auth">
            <v-navigation-drawer
              v-model="drawer"
              ref="drawer"
              :mini-variant.sync="mini"
              permanent
              left
              fixed
            >
              <!-- <v-list-item class="px-2">
                  <v-list-item-avatar>
                    <v-avatar color="orange" size="30" />
                  </v-list-item-avatar>
                  <v-list-item-title>Your Name</v-list-item-title>
                </v-list-item>
                <v-divider /> -->
              <v-list dense>
                <v-list-item class="px-2">
                  <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <!-- <nuxt-link
                  :to="item.url"
                  v-for="item in items"
                  :key="item.title"
                > -->
                <v-list-item
                  link
                  class="px-2"
                  v-for="item in items"
                  :key="item.title"
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <!-- <v-list-item>
                  <p>{{ auth }}</p>
                </v-list-item> -->
                <!-- </nuxt-link> -->
                <v-list-item @click="logout" class="px-2">
                  <v-list-item-icon>
                    <v-icon>mdi-exit-to-app</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    Logout
                  </v-list-item-content>
                </v-list-item>
                <!-- <v-list-item class="px-2">
                    <button class="lightTheme" />
                </v-list-item> -->
              </v-list>
            </v-navigation-drawer>
          </v-col>
          <v-col>
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer absolute app class="text-center">
      <div>{{ new Date().getFullYear() }} year</div>
      <div>
        Created by:
        <a href="https://vk.com/aless_arver" target="_blank">Aless Arver</a>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data: () => ({
    lightTheme: true,
    drawer: true,
    mini: false,
    title: "Vuetify.js",
    items: [
      {
        url: "/schedules",
        title: "Schedules",
        icon: "mdi-calendar-clock"
      },
      { url: "/todos", title: "Todos", icon: "mdi-calendar-edit" },
      { url: "/settings", title: "Settings", icon: "mdi-cog" }
    ],
    window: {
      width: 0
    },
    windowWidth: 0,
    auth: null
  }),
  watch: {
    windowWidth: function(val) {
      if (val <= 1000) {
        this.mini = true;
      } else this.mini = false;
    }
  },
  created() {},
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    this.isAuth();
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  methods: {
    isAuth() {
      if (Cookies.get("userData")) {
        this.auth = Cookies.get("userData");
        this.drawer = true;
      } else this.drawer = false;
    },
    handleResize() {
      // this.window.width = window.innerWidth;
      this.windowWidth = window.innerWidth;
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="sass" scoped>
.lightTheme
  width: 20px
  height: 20px
  background: #fff
  border-radius: 50px
  transition: all 0.3s ease

  &:hover
    background: #000
</style>
