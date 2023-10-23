import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import i18n from '@/locales/i18n';
import '@/assets/styles/main.scss';
import stores from './stores';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(stores);
app.use(i18n);
app.mount('#app');
