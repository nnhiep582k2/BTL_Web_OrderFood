import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/home-view/HomeView.vue';
import AboutView from '@/views/about-view/AboutView.vue';
import PromotionsView from '@/views/promotion-view/PromotionsView.vue';
import MenuView from '@/views/menu-view/MenuView.vue';
import TableView from '@/views/table-view/TableView.vue';
import LoginView from '@/views/auth-view/LoginView.vue';
import RegisterView from '@/views/auth-view/RegisterView.vue';
import CartView from '@/views/cart-view/CartView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
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
            path: '/cart',
            name: 'cart',
            component: CartView,
        },
        {
            path: '/:catchAll(.*)',
            component: () => import('@/views/notfound-view/NotFoundView.vue'),
        },
    ],
});

export default router;
