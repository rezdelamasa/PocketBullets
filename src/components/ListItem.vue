<script setup lang="ts">
  import { ref } from 'vue'
  import { Item } from "../pages/Daily.vue";

  interface Props {
    item: Item
  }

  const props = defineProps<Props>();

</script>

<template>
  <li v-if="item.status === 'incomplete'" class="item--complete">{{ item.text }}</li>
  <li v-if="item.status === 'complete'" class="item--incomplete">{{ item.text }}</li>
  <li v-if="item.status === 'migrated'" class="item--migrated">{{ item.text }}</li>
  <li v-if="item.status === 'cancelled'" class="item--cancelled">{{ item.text }}</li>
  <li v-if="item.status === 'futured'" class="item--futured">{{ item.text }}</li>
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
  }

  li {
    text-align: left;
  }

  li::marker {
    content: inherit;
  }

  li.item--incomplete {
  }

  li.item--complete::marker {
    content: "\2716   ";
  }

  li.item--migrated::marker {
    content: "\2192   ";
  }

  li.item--futured::marker {
    content: "\2190   ";
  }

  li.item--cancelled {
    text-decoration: line-through;
    position: relative;
  }

  li.item--cancelled::marker {
    content: "";
    text-decoration: line-through;
    display: inline-block!important;
    overflow: hidden;
    height: 16px;
  }

  li.item--cancelled::before {
    content: "what";
    position: absolute;
    z-index: 0;
    left: -22px;
    color: transparent;
    text-decoration-color: black!important;
    text-decoration: line-through;
    display: inline-block!important;
  }
</style>
