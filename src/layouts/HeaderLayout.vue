<template>
    <div class="header">
        <div class="brand">
            <div class="logo">
                <img src="/src/assets/images/common/logo.png" alt="logo orod" />
            </div>
            <div class="name">Orod</div>
        </div>
        <div class="list d-flex">
            <div
                class="item"
                v-for="(item, index) in HeaderItem"
                :key="index"
                :class="{ active: isCurrentTab(item) }"
                @click="setActiveTab(item)"
            >
                {{ item }}
            </div>
        </div>
        <div class="options d-flex">
            <div class="option">Cart</div>
            <div class="option">User</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { HeaderItem } from '@/mocks/HeaderItem';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const currentTab = ref(HeaderItem[0]);

const isCurrentTab = (tab: string) => currentTab.value === tab;

const setActiveTab = (tab: string) => {
    currentTab.value = tab;
    router.push({
        name: tab.toLowerCase(),
    });
};
</script>

<style lang="scss" scoped>
.header {
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    padding: 0 80px;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: white;
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.05);
    .brand {
        user-select: none;
        font-size: 25px;
        font-weight: 600;
        display: flex;
        align-items: center;
        .logo {
            width: 30px;
            overflow: hidden;
            margin-right: 6px;
            img {
                width: 100%;
                object-fit: cover;
            }
        }
    }
    .list {
        align-items: center;
        .item {
            font-weight: 500;
            font-size: 17px;
            margin: 0 10px;
            padding: 10px 6px;
            user-select: none;
            &:hover {
                cursor: pointer;
                color: var(--color-primary);
            }
            &.active {
                color: var(--color-primary);
            }
        }
    }
    .options {
        align-items: center;
    }
}
</style>
