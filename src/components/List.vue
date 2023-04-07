<script setup>
import { ref } from 'vue'
import ListItem from "./ListItem.vue";

defineProps({
  items: Array,
})

</script>

<template>
  <ul id="NotesList">
    <template v-for="item in items">
      <ListItem :item="item"></ListItem>
    </template>
  </ul>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

#Daily {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#Notes {
  flex-grow: 1;
}

#DailyNavigator {
  display: flex;
  justify-content: space-between;
}

h2 {
  text-align: left;
}

ul {
  padding-left: 18px;
  list-style-type: disc;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

li {
  text-align: left;
}
</style>
