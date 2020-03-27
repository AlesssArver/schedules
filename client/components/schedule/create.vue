<template>
  <v-card max-width="450">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="title"
            @keyup.enter="create"
            type="text"
            placeholder="Create Todo"
            outlined
            dense
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    title: ""
  }),
  methods: {
    async create() {
      try {
        await this.$store.dispatch("createSchedule", {
          title: this.title
        });
        this.title = "";
      } catch (e) {
        throw e.message;
      }
    }
  }
};
</script>
