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


    function fetchItems() {
        items.value = itemSorter(data.data);
    }

    const sortedItems: ComputedRef<Item[]> = computed(() => {
        return itemSorter(items.value)
    })

    return {items, fetchItems, sortedItems};
})