<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <BoardColumn
        v-for="(column, $columnIndex) in board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
      ></BoardColumn>

      <CreateColumn></CreateColumn>
    </div>

    <div class="task-bg" v-if="isTaskOpen" @click.self="close">
      <router-view @closeTask="close"></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '../components/BoardColumn'
import CreateColumn from '../components/CreateColumn'

export default {
  components: {
    BoardColumn,
    CreateColumn
  },
  data() {
    return {
      newColumnName: ''
    }
  },
  computed: {
    ...mapState(['board']),

    isTaskOpen() {
      return this.$route.name === 'task'
    }
  },
  methods: {
    close() {
      this.$router.push({ name: 'board' })
    }
  }
}
</script>

<style lang="css">
.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
