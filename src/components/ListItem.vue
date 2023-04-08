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
</template>

<style scoped>
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

  li.item--cancelled {
    text-decoration: line-through #999;
    position: relative;
    color: #888888;
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
    text-decoration: line-through #999;
    display: inline-block!important;
  }
</style>
