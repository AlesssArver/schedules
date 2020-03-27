<template>
  <div>
    <v-card
      v-for="schedule in schedules"
      :key="schedule._id"
      max-width="450"
      class="card"
    >
      <v-container>
        <v-row>
          <v-col cols="10">
            <v-text-field
              type="text"
              v-model="schedule.title"
              @keyup.enter="edit(schedule._id)"
              full-width
              outlined
              dense
            />
          </v-col>
          <v-col>
            <v-menu
              ref="menu"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="schedule.time"
                  @keyup.enter="edit(schedule._id)"
                  label="Time"
                  readonly
                  v-on="on"
                  full-width
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="schedule.time"
                full-width
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    time: null,
    menu2: false,
    schedules: [],
    title: "",
    date: ""
  }),
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      axios.get("http://localhost:5000/api/schedule").then(({ data }) => {
        this.schedules = data;
      });
      // this.schedules = this.$store.dispatch("getSchedules")
      // console.log(this.schedules)
    },
    edit(id) {
      axios.put(`http://localhost:5000/api/schedule/${id._id}`, {
        title: id.title,
        date: id.date
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.card 
  margin-bottom: 20px
</style>