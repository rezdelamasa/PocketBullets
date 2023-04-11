<script setup lang="ts">
import {ref} from 'vue'
import {Item} from "../pages/Daily.vue";
import Task from "@components/TaskList/Task.vue";
import Event from "@components/TaskList/Event.vue";
import Note from "@components/TaskList/Note.vue";

interface Props {
  item: Item
}

const props = defineProps<Props>();

</script>

<template>
  <div class="item-wrapper">
    <Task v-if="item.type === 'task'" :item="item"/>
    <Event v-if="item.type === 'event'" :item="item"/>
    <Note v-if="item.type === 'note'" :item="item"/>
  </div>
</template>

<style scoped>
.item-wrapper {
  margin-bottom: 0.25rem;
  width: 100%;
}
</style>
