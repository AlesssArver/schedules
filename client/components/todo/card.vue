<template>
  <v-card class="ScheduleCard">
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-checkbox />
        </v-col>
        <v-col>
          <p v-if="!edit" :class="completed ? 'completed' : ''">Go to store</p>
          <v-text-field
            v-if="edit"
            type="text"
            value="Go to store"
            full-width
            outlined
            dense
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <a href="#" @click="edit = !edit">Edit</a>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    completed: false,
    edit: false
  }),
  methods: {}
};
</script>