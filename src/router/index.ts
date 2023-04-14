import { createRouter, createWebHistory } from 'vue-router'
import index from '@/pages/index.vue'
import Daily from '@/pages/Daily.vue'
import Weekly from '@/pages/Weekly.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: index,
    },
    {
        path: '/daily/:id',
        component: Daily
    },
    {
        path: '/weekly/',
        component: Weekly
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router