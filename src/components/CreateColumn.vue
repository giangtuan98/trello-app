<template>
  <div class="column flex">
    <input
      type="text"
      v-model="newColumnName"
      class="p-2 mr-2 felx-grow w-full"
      placeholder="New column name"
      @keyup.enter="createColumn"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      newColumnName: ''
    }
  },
  methods: {
    createColumn() {
      this.$store.dispatch('createColumn', {
        name: this.newColumnName
      })

      this.newColumnName = ''
    }
  }
}
</script>

<style></style>
