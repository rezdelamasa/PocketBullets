<script setup lang="ts">
import {ComputedRef, Ref, ref, computed, nextTick} from 'vue'
import {Item} from "../../types"
import UncheckedBox from "@icons/UncheckedBox.vue";
import CheckedBox from "@icons/CheckedBox.vue";
import Star from "@icons/Star.vue";
import StarFilled from "@icons/StarFilled.vue";
import {useItemsStore} from "@/store/items";

const itemsStore = useItemsStore();

interface Props {
    item: Item,
}

const props = defineProps<Props>();

const switching: Ref<boolean> = ref(false);
const hovering: Ref<boolean> = ref(false);

const importantSwitching: Ref<boolean> = ref(false);
const importantHovering: Ref<boolean> = ref(false);

const editing: Ref<boolean> = ref(false);
const TaskText = ref<HTMLParagraphElement | null>(null);

function handleCheckboxClick() {
    switching.value = true;

    setTimeout(() => {
        itemsStore.toggleItemCompletion(props.item);
        switching.value = false;
    }, 300)

}

function handleInputSubmit(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLParagraphElement;
    if (target.textContent) {
        if (!target.textContent.length) {
            return;
        }
    }
    const newText = target.textContent;
    const newItem = props.item;
    newItem.text = newText;
    itemsStore.updateItemText(newItem);
    if (TaskText.value) {
        TaskText.value?.blur();
    }
}

function handleImportantClick() {
    importantSwitching.value = true;

    setTimeout(() => {
        itemsStore.toggleItemImportance(props.item);
        importantSwitching.value = false;
    }, 300)

}

async function startEditing() {
    if (props.item.status !== 'incomplete' || editing.value) return;
    editing.value = true;
    await nextTick();
    if (TaskText.value) {
        setCaratToEnd(TaskText.value);
        TaskText.value?.focus();
    }
}

function setCaratToEnd(element: HTMLElement) {
    // Place cursor at the end of a content editable div
    if (element.getAttribute("contenteditable") === "true") {
        element.focus();
        window?.getSelection()?.selectAllChildren(element);
        window?.getSelection()?.collapseToEnd();
    }
}

function cancelEdit() {
    editing.value = false;
    if (TaskText.value) {
        TaskText.value.textContent = props.item.text;
    }
}

const showUncheckedBox: ComputedRef<boolean> = computed(() => {
    if (props.item.status === 'incomplete') {
        return !hovering.value && !switching.value;
    }
    if (props.item.status === 'complete') {
        return hovering.value || switching.value;
    }
    return false;
})

const computedStatusClass: ComputedRef<string> = computed(() => {
  return "item--" + props.item.status;
})


</script>

<template>
    <li
      class="list__item"
      :class="[
      computedStatusClass,
      {
        'item--switching' : switching,
        'item--important-switching' : importantSwitching
      }
    ]"
    >
        <div class="list__item__bullet">
            <button
              class="bullet__button"
              @click="handleCheckboxClick"
              @mouseover="hovering = true"
              @mouseleave="hovering = false"
            >
                <UncheckedBox v-if="showUncheckedBox"/>
                <CheckedBox v-else/>
            </button>
        </div>
        <div class="list__item__content">
            <div class="list__item__text">
                <p
                  class="my-0"
                  :contenteditable="editing"
                  @click="startEditing"
                  @keydown.enter.prevent="handleInputSubmit($event)"
                  @keydown.esc.prevent="cancelEdit"
                  v-click-outside="cancelEdit"
                  ref="TaskText"
                >
                    {{ item.text }}
                </p>
            </div>
            <p v-if="item.status === 'migrated'" class="my-0 list__item__subtext">Moved to Apr 30</p>
            <p v-if="item.status === 'cancelled'" class="my-0 list__item__subtext">Cancelled</p>
        </div>
        <div class="list__item__signifier">
            <button
              class="signifier__button"
              @click="handleImportantClick"
              @mouseover="importantHovering = true"
              @mouseleave="importantHovering = false"
            >
                <Star v-if="!item.important && !importantHovering"/>
                <StarFilled v-else/>
            </button>
        </div>
    </li>
</template>

<style scoped>
.item--complete {
  color: #888;
  transition: none;
  text-decoration: line-through;
}

.item--complete :deep(svg),
.item--migrated :deep(svg),
.item--cancelled :deep(svg) {
  fill: #888;
}

.item--incomplete :deep(svg) {
  fill: #333;
}

.bullet__button,
.signifier__button {
    width: 100%;
    height: 100%;
    padding: 0;
    background: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.signifier__button:hover :deep(svg) {
    fill: #999;
}

.list__item__text > p {
    padding: 2px 4px;
}

.list__item {
    opacity: 1;
    text-align: left;
    list-style: none;
    display: flex;
    align-items: flex-start;
    margin: 0.3rem 0;
    width: 100%;
}

.list__item.item--switching,
.list__item.item--important-switching {
  opacity: 0;
  transition: all 0.3s;
}

.list__item__bullet {
    font-size: 1.25rem;
    height: 100%;
    width: 1.25rem;
    min-width: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-top: 3px;
}

.list__item__bullet > span {
  height: 1.25rem;
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
