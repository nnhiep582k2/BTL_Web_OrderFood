import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PromotionsView from '@/views/PromotionsView.vue';
import MenuView from '@/views/MenuView.vue';
import TableView from '@/views/TableView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';
import DemoView from '@/views/demo/DemoView.vue';
import OrderView from '@/views/OrderView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'demo',
            component: DemoView,
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView,
        },
        {
            path: '/promotions',
            name: 'promotions',
            component: PromotionsView,
        },
        {
            path: '/menu',
            name: 'menu',
            component: MenuView,
        },
        {
            path: '/table',
            name: 'table',
            component: TableView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/order',
            name: 'order',
            component: OrderView,
        },
        
        {
            path: '/:catchAll(.*)',
            component: () => import('@/views/NotFoundView.vue'),
        },
    ],
});

export default router;
