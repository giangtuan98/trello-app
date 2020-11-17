<template>
  <div @drop="onDrop" @dragenter.prevent @dragover.prevent>
    <slot />
  </div>
</template>

<script>
export default {
  methods: {
    onDrop(e) {
      const transferData = JSON.parse(e.dataTransfer.getData('payload'))

      this.$emit('drop', transferData)
    }
  }
}
</script>

<style></style>
