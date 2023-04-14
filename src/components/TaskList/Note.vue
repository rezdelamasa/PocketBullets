<script setup lang="ts">
import {Item} from '../../types';
import Dash from "@icons/Dash.vue";
import Star from "@icons/Star.vue";
import StarFilled from "@icons/StarFilled.vue";

interface Props {
  item: Item
}

const props = defineProps<Props>();

</script>

<template>
  <li class="list__item">
    <div class="list__item__bullet">
      <Dash :color="'#333'"/>
    </div>
    <div class="list__item__content">
        <span>{{ props.item.text }}</span>
    </div>
    <div class="list__item__signifier">
        <StarFilled v-if="props.item.important" :color="'#333'"/>
      <Star v-else :color="'#333'"/>
    </div>
  </li>
</template>

<style scoped>
li {
  text-align: left;
}

li::marker {
  content: inherit;
}

.list__item {
  list-style: none;
  display: flex;
  align-items: flex-start;
  margin: 0.3rem 0;
  width: 100%;
}

.list__item__bullet {
  font-size: 1.5rem;
  height: 1.5rem;
  width: 1.5rem;
  min-width: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.list__item__bullet > span {
  height: 1.5rem;
  width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.list__item__content {
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.list__item__signifier {
  height: 1.25rem;
  width: 1.25rem;
  min-width: 1.25rem;
  align-self: center;
}
</style>
