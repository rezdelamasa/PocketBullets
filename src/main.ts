import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from 'pinia';
import router from '@/router/index.ts'
import withUUID from "vue-uuid";
import vClickOutside from "click-outside-vue3"

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(withUUID);
app.use(pinia);
app.use(vClickOutside);
app.mount('#app');
