<script setup>
import { ref } from 'vue'
import ListItem from "./ListItem.vue";

defineProps({
  items: Array,
})

</script>

<template>
  <ul class="task-list">
    <template v-for="item in items">
      <ListItem :item="item"></ListItem>
    </template>
  </ul>
</template>

<style scoped>
.task-list {
  margin-bottom: 0;
}

.task-list {
  padding: 0;
  list-style-type: disc;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
