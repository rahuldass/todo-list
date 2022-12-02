import Vue from 'vue';
import Vuex from 'vuex';

import indexDb from '@/api/indexDb';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
  },
  mutations: {},
  actions: {
    async addTask(context, task) {
      console.log('From store' + task);
      await indexDb.addTask(task);
    },
    async getTaskList(context) {
      context.state.tasks = [];
      let tasks = await indexDb.getTaskList();
      tasks.forEach((c) => {
        context.state.tasks.push(c);
      });
    },
  },
});
