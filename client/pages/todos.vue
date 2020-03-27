<template>
  <div>
    <h1 class="text-center">Todos</h1>
    <v-row>
      <v-col>
        <TodoCard />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TodoCreate />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TodoCard from "@/components/todo/card";
import TodoCreate from "@/components/todo/create";

export default {
  components: { TodoCard, TodoCreate }
};
</script>

<style lang="sass" scoped></style>
