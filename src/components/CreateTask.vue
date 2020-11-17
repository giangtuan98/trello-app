<template>
  <input
    type="text"
    class="block p-2 w-full bg-transparent"
    placeholder="+ Enter new task"
    @keyup.enter="createTask($event)"
  />
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array
    }
  },
  methods: {
    createTask(event) {
      if (event.target.value) {
        this.$store.dispatch('createTask', {
          name: event.target.value,
          tasks: this.tasks
        })
        event.target.value = ''
      }
    }
  }
}
</script>

<style></style>
