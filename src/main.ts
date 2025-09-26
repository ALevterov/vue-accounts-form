import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';
import App from './App.vue';
import './index.css';

const pinia = createPinia();
pinia.use(piniaPersist);

createApp(App).use(pinia).mount('#app');
