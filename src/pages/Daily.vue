<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import type { Ref } from 'vue';
import List from "../components/List.vue";
import {useDrawerStore} from "../store/drawer";
const drawerStore = useDrawerStore();
import AddTask from "@components/TaskList/AddTask.vue";

import { useItemsStore } from "../store/items";
const itemsStore = useItemsStore();
import {useRoute} from 'vue-router'

const route = useRoute();

export interface Item {
  id: string;
  text: string,
  status: string,
  type: string,
  important: boolean
}

function openDrawer() {
  drawerStore.drawer = true;
}

const date: Ref<Date> = ref(new Date);

onMounted(() => {
  itemsStore.fetchItems();
})

</script>

<template>
  <div class="container">
    <div class="daily-view">
      <div class="daily-view__header">
        <button @click="openDrawer()" class="daily-view__header__button button--text button--left">&#9776;</button>
      </div>
      <div class="daily-view__content">
          <h2 class="daily-view__title">{{ date.toLocaleString('default', {month: 'short'}) }} {{ date.getDate() }}</h2>
          <div class="daily-view__list">
              <List :items="itemsStore.getDayItems( date )"></List>
              <AddTask :day="date"></AddTask>
          </div>
      </div>
      <div class="daily__paginator">
        <button class="button--text button--left"><span>&lt; Apr 5</span></button>
        <button class="button--text button--right"><span>Apr 7 &gt;</span></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.daily-view {
  width: 100%;
  max-width: 1080px;
}

.daily-view__content {
  flex-grow: 1;
  overflow: scroll;
}

.daily__paginator {
  display: flex;
  justify-content: space-between;
}

.daily-view {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.daily-view__header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
}

.daily-view__header__button {
  font-weight: 900;
}

.daily-view__title {
  margin: 0;
  font-weight: 600;
}

.daily-view__content {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.daily-view__list {

}

h2 {
  text-align: left;
}

ul {
  padding-left: 18px;
  list-style-type: disc;
}

li {
  text-align: left;
}
</style>
