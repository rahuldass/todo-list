const DB_NAME = 'todo-list-db';
const DB_VERSION = 1;
let DB;

export default {
  async getDatabase() {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB);
      }
      console.log('Opening database', DB);
      let request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (e) => {
        console.log('Error opening db', e);
        reject('Error');
      };

      request.onsuccess = (e) => {
        DB = e.target.result;
        resolve(DB);
      };

      request.onupgradeneeded = (e) => {
        console.log('onupgradeneeded');
        let db = e.target.result;
        db.createObjectStore('tasks', {
          autoIncrement: true,
          keyPath: 'id',
        });
      };
    });
  },
  async addTask(task) {
    let db = await this.getDatabase();

    return new Promise((resolve) => {
      let trans = db.transaction(['tasks'], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore('tasks');
      console.log('From api ' + task);
      store.put(task);
      console.log('Task created');
    });
  },
  async getTaskList() {
    let db = await this.getDatabase();

    return new Promise((resolve) => {
      let trans = db.transaction(['tasks'], 'readonly');
      trans.oncomplete = () => {
        resolve(tasks);
      };

      let store = trans.objectStore('tasks');
      let tasks = [];

      store.openCursor().onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
          tasks.push(cursor.value);
          cursor.continue();
        }
      };
    });
  },
};
