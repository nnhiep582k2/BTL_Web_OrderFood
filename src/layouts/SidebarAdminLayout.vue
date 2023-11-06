<template>
    <div class="sidebar__container">
        <h2>Hello Admin</h2>
        <ul class="sidebar__list">
            <li
                class="sidebar__item"
                v-for="item in sidebarItem"
                :key="item"
                :class="{ active: isCurrentSidebar(item) }"
                @click="setActiveSidebar(item)"
            >
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const sidebarItem = [
    'Users',
    'Roles',
    'Foods',
    'FoodImages',
    'Categorys',
    'Bills',
    'Carts',
    'Orders',
    'PaymentOrders',
    'Payments',
];
const router = useRouter();
const currentSidebar = ref(sidebarItem[0]);
const isCurrentSidebar = (tab: string) => currentSidebar.value === tab;
const setActiveSidebar = (tab: string) => {
    if (tab.toLocaleLowerCase() === 'users') {
        router.push({ path: `/admin/auth` });
    } else {
        router.push({
            path: `/admin/${tab.charAt(0).toLowerCase() + tab.slice(1)}`,
        });
    }
};
</script>

<style scoped lang="scss">
.sidebar__container {
    width: 15%;
    background: var(--color-primary-bolder);
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    h2 {
        color: #fff;
        text-align: center;
        margin-top: 20px;
        font-weight: 600;
    }

    .sidebar__list {
        padding: 0;
        margin: 0;
        .sidebar__item {
            padding: 16px 16px;
            font-size: 20px;
            font-weight: 500;
            font-size: 17px;
            margin: 0 10px;
            user-select: none;
            margin: 0px !important;
            cursor: pointer;
            color: #fff;

            &:hover {
                background: var(--color-primary);
            }
        }
    }
}
</style>
