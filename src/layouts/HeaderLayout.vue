<template>
    <div class="header p-x-80">
        <RouterLink to="/">
            <div class="brand">
                <div class="logo">
                    <img
                        src="/src/assets/images/common/logo.png"
                        alt="logo orod"
                    />
                </div>
                <div class="name">Orod</div>
            </div>
        </RouterLink>
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
            <div class="option">
                <RouterLink to="/cart">
                    <BaseIcon>
                        <i class="fa-solid fa-cart-shopping"></i
                    ></BaseIcon>
                </RouterLink>
            </div>
            <div class="option">
                <BaseIcon><i class="fa-solid fa-user"></i></BaseIcon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { HeaderItem } from '@/mocks/HeaderItem';
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import BaseIcon from '@/components/BaseIcon.vue';

const router = useRouter();

const currentTab = ref(HeaderItem[0]);

const isCurrentTab = (tab: string) => currentTab.value === tab;

const setActiveTab = (tab: string) => {
    router.push({
        name: tab.toLowerCase(),
    });
};

const route = useRoute();

watch(
    () => route.name,
    (newValue) => {
        if (newValue) {
            currentTab.value =
                newValue.toString().slice(0, 1).toLocaleUpperCase() +
                newValue.toString().slice(1);
        }
    }
);
</script>

<style lang="scss" scoped>
.header {
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: white;
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.05);
    a {
        color: black;
        display: block;
        text-decoration: none;
    }
    .brand {
        user-select: none;
        font-size: 25px;
        font-weight: 600;
        display: flex;
        align-items: center;
        .logo {
            width: 30px;
            overflow: hidden;
            display: flex;
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
        .option {
            & + .option {
                margin-left: 6px;
            }
        }
    }
}
</style>
