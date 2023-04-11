<script setup lang="ts">
import {Ref, ref, nextTick} from 'vue'
import {uuid} from 'vue-uuid';
import {useItemsStore} from "@/store/items";

const itemsStore = useItemsStore();

const inputVisible: Ref<boolean> = ref(false);
const inputValue: Ref<string> = ref("");
const selectedType: Ref<string> = ref("task");
const taskIsImportant: Ref<boolean> = ref(false);
const taskInput = ref<HTMLInputElement | null>(null);

function addTask() {
    const newTask = {
        id: uuid.v1(),
        text: inputValue.value,
        status: "incomplete",
        type: selectedType.value,
        important: taskIsImportant.value
    }

    itemsStore.items.push(newTask);
    inputValue.value = "";
}

function toggleTaskImportance() {
    taskIsImportant.value = !taskIsImportant.value
}

function hideInput() {
    if (!inputVisible.value) return;
    inputVisible.value = false;
}

async function showInput() {
    if (inputVisible.value) return;
    inputVisible.value = true;
    await nextTick();
    if (inputVisible.value) {
        taskInput.value?.focus();
    }
}

</script>

<template>
    <li class="task--add" v-click-outside="hideInput">
        <Transition name="fade">
            <div class="task__input-wrapper" v-if="inputVisible">
                <input
                        @keyup.enter="addTask"
                        @keyup.esc="hideInput"
                        v-model="inputValue"
                        autofocus
                        ref="taskInput"
                        class="task__input"
                        contenteditable="true"
                        placeholder="Start typing..."
                />
                <select
                        name="task-type"
                        id="task-type"
                        class="task__type-selector"
                        v-model="selectedType"
                >
                    <option value="task">Task</option>
                    <option value="event">Event</option>
                    <option value="note">Note</option>
                </select>
                <button
                        class="task__input__toggle"
                        :class="taskIsImportant ?
              'task__input__toggle--active' :
              'task__input__toggle--inactive'"
                        @click="toggleTaskImportance"
                ><span>!</span></button>
            </div>
        </Transition>
        <Transition name="fade">
            <div class="task__button" @click="showInput" v-if="!inputVisible">
                <div class="task__wrapper">
                    <div class="task__bullet">+</div>
                    <div class="task__content">
                        Add Task
                    </div>
                </div>
            </div>
        </Transition>
    </li>
</template>

<style scoped>
.task--add {
    list-style-type: none;
    max-width: 80vw;
    min-width: min-content;
    width: 100%;
    margin: 0.5rem 0;
    height: 36px;
}

.task__wrapper {
    display: flex;
    font-weight: 500;
    color: #888888;
}

.task__content {
    margin: 0 1rem;
}

.task__bullet {
    font-weight: 700;
}

.task__button {
    margin: auto;
    height: 100%;
    display: flex;
    align-items: center;
}

.task__button:hover {
    cursor: pointer;
}

.task__input-wrapper {
    background-color: transparent;
    border: 1px solid #9E9E9E;
    display: flex;
    border-radius: 4px;
    align-items: center;
    height: 100%;
}

.task__input {
    padding: 0.6rem 1rem;
    border: none;
    margin: 0.25rem 0;
    color: #333333;
    box-sizing: content-box;
    border-radius: 4px;
    width: 100%;
    min-width: min-content;
    background: transparent;
}

.task__input:focus {
    outline: none;
}

.task__type-selector {
    background: transparent;
    border: none;
    color: #333333;
    margin: 0 1rem;
    outline: none;
}

.task__type-selector:hover {
    cursor: pointer;
}

.fade-enter-active {
    transition: opacity 0.2s ease;
}

.fade-leave-active {
    display: none;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.task__input__toggle {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 28px;
    height: 28px;
    margin-right: 1rem;
    border-radius: 4px;
    background: transparent;
}

.task__input__toggle > span {
    width: 28px;
    color: #A6A5A2;
    font-size: 18px;
    font-weight: bold;
}

.task__input__toggle:hover {
    background: #E0DFDC;
}

.task__input__toggle--active, .task__input__toggle--active:hover {
    background: #FFD54F;
}

.task__input__toggle--active > span {
    color: white;
}
</style>