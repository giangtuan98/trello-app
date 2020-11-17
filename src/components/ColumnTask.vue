<template>
  <div
    class="task"
    draggable
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @drop.stop="changeTaskIndex($event, taskIndex, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @click="goToTask(task)"
  >
    <span class="w-full flex-no-shrink font-bold">
      {{ task.name }}
    </span>
    <p class="w-full flex-no-shrink mt-1 text-sm">
      {{ task.description }}
    </p>
  </div>
</template>

<script>
import movingTasksAndColumns from '../mixins/movingTasksAndColumns'

export default {
  mixins: [movingTasksAndColumns],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number
    }
  },
  methods: {
    pickupTask(event, taskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      // only allow pass string in data transfer
      event.dataTransfer.setData('task-index', taskIndex)
      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'task')
    },
    goToTask(task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    }
  }
}
</script>

<style>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
