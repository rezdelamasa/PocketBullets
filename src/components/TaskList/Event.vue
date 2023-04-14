<script setup lang="ts">
import {Item} from '../../types';
import Calendar from "@icons/Calendar.vue";
import CalendarCheck from "@icons/CalendarCheck.vue";
import CalendarX from "@icons/CalendarX.vue";
import Star from "@icons/Star.vue";
import StarFilled from "@icons/StarFilled.vue";

interface Props {
  item: Item
}

const props = defineProps<Props>();

</script>

<template>
  <li class="list__item"
      :class="{
      'item--incomplete' : item.status === 'incomplete',
      'item--complete' : item.status === 'complete',
      'item--migrated' : item.status === 'migrated',
      'item--cancelled' : item.status === 'cancelled',
    }"
  >
    <div class="list__item__bullet">
      <Calendar v-if="item.status === 'incomplete'"/>
      <CalendarCheck v-if="item.status === 'complete'"/>
      <CalendarX v-if="item.status === 'cancelled'"/>
    </div>
    <div class="list__item__content">
      <p class="my-0">{{ item.text }}</p>
      <p v-if="item.status === 'cancelled'" class="my-0 list__item__subtext">Cancelled</p>
    </div>
    <div class="list__item__signifier">
      <StarFilled v-if="item.important"/>
      <Star v-else/>
    </div>
  </li>
</template>

<style scoped>

.item--complete,
.item--migrated,
.item--cancelled {
  color: #888;
}

.item--complete :deep(svg),
.item--migrated :deep(svg),
.item--cancelled :deep(svg) {
  fill: #888;
}

.item--incomplete :deep(svg) {
  fill: #333;
}

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
