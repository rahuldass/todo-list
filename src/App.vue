<template>
  <div>
    <div class="flex items-center justify-center my-5">
      <img alt="Vue logo" src="./assets/logo.png" />
    </div>
    <TodoList
      msg="Offline To-Do list application"
      class="flex items-center justify-center"
    />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';

export default {
  name: 'App',
  components: {
    TodoList,
  },
};
</script>

<style></style>
