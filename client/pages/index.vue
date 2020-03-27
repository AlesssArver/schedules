<template>
  <div class="home">
    <v-row>
      <v-spacer />
      <v-col>
        <authForm />
      </v-col>
      <v-spacer />
    </v-row>
  </div>
</template>

<script>
import authForm from "@/components/authForm";

export default {
  components: { authForm }
};
</script>

<style lang="sass" scoped>
.home 
  margin: 20px 0
  width: 100vw
</style>
