import { createApp } from 'vue';
import Vue3Toasity, { toast, type ToastOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import '@/assets/styles/main.scss';
import App from './App.vue';
import router from './router';
import i18n from '@/locales/i18n';
import stores from './stores';

const app = createApp(App);

app.use(Vue3Toasity, {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
} as ToastOptions);
app.use(router);
app.use(stores);
app.use(i18n);

app.mount('#app');
