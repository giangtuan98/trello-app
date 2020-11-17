import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils'
Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask: state => {
      return id => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      })
    },
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value
      // Vue.set(task, key, value)
    },
    MOVE_TASK(state, { fromTasks, toTasks, taskIndex }) {
      const taskToMove = fromTasks.splice(taskIndex, 1)[0]

      toTasks.push(taskToMove)
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const listColumns = state.board.columns

      const columnToMove = listColumns.splice(fromColumnIndex, 1)[0]
      listColumns.splice(toColumnIndex, 0, columnToMove)
    },
    CHANGE_TASK_INDEX(
      state,
      { fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex }
    ) {
      const listColumns = state.board.columns
      const taskToMove = listColumns[fromColumnIndex].tasks.splice(
        fromTaskIndex,
        1
      )[0]
      listColumns[toColumnIndex].tasks.splice(toTaskIndex, 0, taskToMove)
    }
  },
  actions: {
    createColumn({ commit }, { name }) {
      commit('CREATE_COLUMN', { name })
    },
    createTask({ commit, dispatch }, { tasks, name }) {
      commit('CREATE_TASK', { tasks, name })
    },
    updateTask({ commit }, { task, key, value }) {
      commit('UPDATE_TASK', { task, key, value })
    },
    moveTask({ commit }, { fromTasks, toTasks, taskIndex }) {
      commit('MOVE_TASK', { fromTasks, toTasks, taskIndex })
    },
    moveColumn({ commit }, { fromColumnIndex, toColumnIndex }) {
      commit('MOVE_COLUMN', { fromColumnIndex, toColumnIndex })
    },
    changeTaskIndex(
      { commit },
      { fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex }
    ) {
      commit('CHANGE_TASK_INDEX', {
        fromTaskIndex,
        toTaskIndex,
        fromColumnIndex,
        toColumnIndex
      })
    }
  }
})
