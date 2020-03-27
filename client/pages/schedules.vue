<template>
  <div class="home">
    <v-alert type="warning" class="text-center warning">
      It's test version.
    </v-alert>
    <h1 class="title text-center">Shedules</h1>
    <div v-if="auth">
      <v-row>
        <v-spacer />
        <v-col>
          <ScheduleCard />
        </v-col>
        <v-spacer />
      </v-row>
      <v-row>
        <v-spacer />
        <v-col>
          <ScheduleCreate />
        </v-col>
        <v-spacer />
      </v-row>
    </div>
    <div v-else class="text-center warning">U are not authenticated</div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

import ScheduleCard from "@/components/schedule/card";
import ScheduleCreate from "@/components/schedule/create";

export default {
  components: { ScheduleCard, ScheduleCreate },
  data: () => ({
    auth: null
  }), 
  mounted() {
    this.isAuth()
  },
  methods: {
    isAuth() {
      if (Cookies.get("userData")) {
        this.auth = Cookies.get("userData");
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.home
  width: 100vw

.warning
  margin-bottom: 20px

.title
  margin-bottom: 20px
</style>
