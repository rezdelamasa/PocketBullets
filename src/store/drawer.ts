import { defineStore } from 'pinia';
import { ref } from 'vue'
// @ts-ignore
import type { Ref } from 'vue';
export const useDrawerStore = defineStore('drawer', () => {
    let drawer: Ref<boolean> = ref(false);

    return { drawer };
})