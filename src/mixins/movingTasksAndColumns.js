export default {
  props: {
    columnIndex: {
      type: Number
    }
  },
  methods: {
    moveColumn(event, toColumnIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')

      this.$store.dispatch('moveColumn', {
        fromColumnIndex,
        toColumnIndex
      })
    },
    moveTaskOrColumn(event, toTasks, toColumnIndex) {
      const type = event.dataTransfer.getData('type')

      if (type == 'column') {
        this.moveColumn(event, toColumnIndex)
      } else {
        this.changeTaskIndex(event, toTasks.length, toColumnIndex)
      }
    },
    changeTaskIndex(event, toTaskIndex, toColumnIndex) {
      const type = event.dataTransfer.getData('type')

      if (type == 'task') {
        const fromColumnIndex = event.dataTransfer.getData('from-column-index')

        const fromTaskIndex = event.dataTransfer.getData('task-index')

        this.$store.dispatch('changeTaskIndex', {
          fromTaskIndex,
          toTaskIndex,
          fromColumnIndex,
          toColumnIndex
        })
      } else {
        // this.$emit('moveColumn', event, toColumnIndex)
        this.moveColumn(event, toColumnIndex)
      }
    }
  }
}
