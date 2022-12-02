<template>
  <div class="h-100 w-full flex items-center justify-center font-sans">
    <div class="bg-white rounded shadow p-6 m-4 w-full md:max-w-lg">
      <div class="mb-4">
        <h1 class="text-grey-darkest">Todo List</h1>
        <div class="flex mt-4">
          <input
            v-model="tasks.item"
            class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            placeholder="Add Todo"
            required
          />
          <button
            @click="addTask"
            class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <div
          v-for="(task, idx) in tasks"
          :key="idx"
          class="flex mb-4 items-center"
        >
          <ul class="bg-white rounded-lg w-96 text-gray-900 w-full">
            <li class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
              {{ task.item }}
              <button
                class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
              >
                Edit
              </button>
              <button
                class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
              >
                Remove
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  created() {
    this.tasks = { item: '' };
    this.$store.dispatch('getTaskList');
  },
  computed: {
    isEmpty: ({ tasks }) => tasks.length === 0,
    tasks() {
      return this.$store.state.tasks;
    },
  },
  methods: {
    async addTask() {
      await this.$store.dispatch('addTask', this.tasks);
    },
  },
};
</script>

<style scoped></style>
