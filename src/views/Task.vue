<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input
        type="text"
        :value="task.name"
        class=" w-full p-2 mr-2 flex-grow text-xl font-bold"
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateAndCloseTask($event, 'name')"
      />
      <textarea
        class="w-full relative bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
        :value="task.description"
        @change="updateTaskProperty($event, 'description')"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getTask']),
    task() {
      return this.getTask(this.$route.params.id)
    }
  },
  methods: {
    updateTaskProperty(event, property) {
      this.$store.dispatch('updateTask', {
        value: event.target.value,
        key: property,
        task: this.task
      })
    },
    updateAndCloseTask(event, property) {
      this.updateTaskProperty(event, property)
      this.$emit('closeTask')
    }
  }
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
