import {defineStore} from 'pinia';
import {ref, computed, ComputedRef} from 'vue'
// @ts-ignore
import data from '@data/items.json';
// @ts-ignore
import { Item } from "@/components/Daily.vue";
import type { Ref } from 'vue';
export const useItemsStore = defineStore('items', () => {
    let items: Ref<Item[]> = ref([]);
    const statusSortOrder = ["incomplete", "complete", "migrated", "cancelled"];

    function compareStatuses(a: Item, b: Item) {
        const aIndex = statusSortOrder.indexOf(a.status);
        const bIndex = statusSortOrder.indexOf(b.status);
        if (aIndex < bIndex) {
            return -1;
        }
        if (aIndex > bIndex) {
            return 1;
        }
        return 0;
    }

    function compareImportance(a: Item, b: Item) {
        if (a.important) {
            return -1
        }
        return 0;
    }

    function itemSorter(data: Item[]) {
        return data.sort(compareImportance).sort(compareStatuses);
    }

    function toggleItemCompletion(paramItem: Item) {
        console.log(paramItem.status);
        let newStatus: String;
        if (paramItem.status === 'complete') {
            newStatus = 'incomplete';
        } else if (paramItem.status === 'incomplete') {
            newStatus = 'complete';
        }
        items.value = items.value.map(item =>
            (item.id === paramItem.id) ? {...item, status: newStatus} : item);

    }

    function getDayItems(paramDate: Date) {
        // console.log(day);
        // console.log(day.getDate());
        // items.value.forEach(item => {
        //     const itemDate = new Date(item.date);
        //     console.log("item date: ",itemDate.toDateString());
        //     console.log("param date: ", paramDate.toDateString());
        // })


        function sameDate(item: Item) {
            const itemDateString = new Date(item.date).toDateString();
            const paramDateString = paramDate.toDateString();
            console.log("item date: ", itemDateString);
            console.log("paramDateString: ", paramDateString);
            return itemDateString === paramDateString;
        }

        const dayItems = items.value.filter(sameDate);
        return itemSorter(dayItems);
    }

    function toggleItemImportance(paramItem: Item) {
        items.value = items.value.map(item =>
            (item.id === paramItem.id) ? {...item, important: !paramItem.important} : item);

    }

    // Takes an input item
    // Maps through the array
    // If parameter item id matches current item id, it will update the item using spread
    // Else just return the item back
    function updateItemText(paramItem: Item) {
        items.value = items.value.map(item =>
            (item.id === paramItem.id) ? {...item, text: paramItem.text} : item);

    }

    function fetchItems() {
        items.value = itemSorter(data.data);
    }

    const sortedItems: ComputedRef<Item[]> = computed(() => {
        return itemSorter(items.value)
    })

    return {items, fetchItems, sortedItems, toggleItemCompletion, toggleItemImportance, updateItemText, getDayItems};
})