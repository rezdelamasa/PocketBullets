<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import type {Ref} from 'vue';
import List from "../components/List.vue";
import {useDrawerStore} from "../store/drawer";

const drawerStore = useDrawerStore();
import AddTask from "@components/TaskList/AddTask.vue";

import {useItemsStore} from "../store/items";

const itemsStore = useItemsStore();

export interface Item {
    id: string;
    text: string,
    status: string,
    type: string,
    important: boolean
}

interface CalendarDay {
    date: number;
    name: string;
    isToday: boolean;
    meta: Date;
}

function openDrawer() {
    drawerStore.drawer = true;
}

const date: Ref<Date> = ref(new Date);

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

const monthName = () => {
    return monthNames[date.value.getMonth()];
}

const weekCalendar = () => {
    const today = date.value;
}

const weekdays = () => {

}

const shortDayName = () => {
    return dayNamesShort[date.value.getDay()];
}

onMounted(() => {
    itemsStore.fetchItems();
})

const createCalendar = () => {
    const thisWeek = Array.from(Array(7).keys()).map((idx) => {
        const d = new Date();
        d.setDate(d.getDate() - d.getDay() + idx);
        return d;
    });
    const calArray: CalendarDay[] = [];
    thisWeek.forEach((day) => {
        const isToday = day.getDate() === date.value.getDate();
        const dayObj = {
            date: day.getDate(),
            name: dayNamesShort[day.getDay()],
            isToday,
            meta: day
        }
        calArray.push(dayObj);
    })
    return calArray;
}

</script>

<template>
    <div class="container">
        <div class="weekly-view">
            <div class="weekly-view__header">
                <div class="weekly-view__nav">
                    <button @click="openDrawer()" class="weekly-view__header__button button--text button--left">
                        &#9776;
                    </button>
                </div>
                <div class="weekly-view__subheader">
                    <p class="month">{{ monthName() }}</p>
                    <div class="calendar">
                        <div
                                class="calendar__day"
                                v-for="day in createCalendar()"
                                :class="{ 'calendar__day--current' : day.isToday }"
                        >
                            <div
                                    class="calendar__day__wrapper"
                            >
                                <p class="day__name my-0">{{ day.name }}</p>
                                <p class="day__date my-0">{{ day.date }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weekly-view__content">
                <div class="weekly-view__day" v-for="day in createCalendar()"
                     :class="{ 'weekly-view__day--current' : day.isToday }">
                    <p class="weekly-view__subtitle" v-if="day.isToday">Today</p>
                    <h2 class="weekly-view__title">{{ day.name }}, {{ monthName() }} {{ day.date }}</h2>
                    <div class="weekly-view__list">
                        <List :items="itemsStore.getDayItems(day.meta)"></List>
                        <AddTask :day="day.meta"></AddTask>
                    </div>
                </div>
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

.weekly-view__header {
    position: sticky;
    top: 0;
    background: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0;
}

.weekly-view__nav {
    display: flex;
    justify-content: flex-start;
}

.weekly-view__subtitle {
    font-weight: normal;
    margin: 0;
    text-align: left;
}

.calendar {
    display: flex;
    justify-content: space-between;
    max-width: 480px;
    margin: 0 auto;
}

.month {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 0;
}

.calendar__day {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 0.5rem;
}

.calendar__day--current {
    border: 2px solid #555;
    box-sizing: border-box;
    border-radius: 4px;
    font-weight: bold;
}

.weekly-view {
    width: 100%;
    max-width: 1080px;
    display: flex;
    flex-direction: column;
    position: relative;
}

.weekly-view__content {
    flex-grow: 1;
    padding-right: 1.5rem;
}

.weekly__paginator {
    display: flex;
    justify-content: space-between;
}

.weekly-view__day {
    margin-bottom: 3rem;
    /*background: #f3f3f3;*/
    border: 2px solid #ddd;
    box-sizing: border-box;
    padding: 1.5rem;
    border-radius: 4px;
}

.weekly-view__day--current {
    /*border: 2px solid #666;*/
    background-color: white;
    border: 3px solid #333;
}

.weekly-view__header {
    display: flex;
    justify-content: flex-start;
}

.weekly-view__header__button {
    font-weight: 900;
}

.weekly-view__title {
    margin: 0;
    font-weight: 600;
}

.weekly-view__content {
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.weekly-view__list {

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
