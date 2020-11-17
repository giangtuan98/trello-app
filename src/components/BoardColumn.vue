<template>
  <div
    class="column"
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    draggable
    @dragstart.self="pickupColumn($event, columnIndex)"
  >
    <div class="flex items-center mb-2 font-bold">{{ column.name }}</div>
    <div class="list-reset">
      <ColumnTask
        v-for="(task, taskIndex) in column.tasks"
        :key="taskIndex"
        :task="task"
        :taskIndex="taskIndex"
        :columnIndex="columnIndex"
        @changeTaskIndex="changeTaskIndex"
      ></ColumnTask>

      <CreateTask :tasks="column.tasks"> </CreateTask>
    </div>
  </div>
</template>

<script>
import ColumnTask from './ColumnTask'
import CreateTask from './CreateTask'
import movingTasksAndColumns from '../mixins/movingTasksAndColumns'

export default {
  mixins: [movingTasksAndColumns],
  components: {
    ColumnTask,
    CreateTask
  },
  props: {
    column: {
      type: Object,
      required: true
    },

    board: {
      type: Object
    }
  },
  methods: {
    pickupColumn(event, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'column')
    }
  }
}
</script>

<style lang="css">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
