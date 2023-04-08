import { defineStore } from 'pinia';
import { ref } from 'vue'
// @ts-ignore
import data from '@data/items.json';
// @ts-ignore
import { Item } from "@/components/Daily.vue";
import type { Ref } from 'vue';
export const useItemsStore = defineStore('items', () => {
    let items: Ref<Item[]> = ref([]);

    function fetchItems() {
        const statusSortOrder = ["incomplete", "complete", "migrated", "cancelled"];
        function compareStatuses( a: Item, b: Item ) {
            const aIndex = statusSortOrder.indexOf(a.status);
            const bIndex = statusSortOrder.indexOf(b.status);
            if( aIndex < bIndex ) {
                return -1;
            }
            if( aIndex < bIndex ) {
                return 1;
            }
            return 0;
        }
        items.value = data.data.sort( compareStatuses );
    }

    return { items, fetchItems };
})