<template>
    <div class="base-list-footer">
        <div class="title">{{ title }}</div>
        <div class="list">
            <div class="item" v-for="(item, index) in datas" :key="index">
                <span>{{ item }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ListFooter } from '@/mocks/ListFooter';

const props = defineProps<ListFooter>();
</script>

<style lang="scss" scoped>
.title {
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 16px;
}
.list {
    display: flex;
    align-items: left;
    justify-content: space-between;
    text-align: left;
    flex-direction: column;
    width: 100%;
    .item {
        display: block;
        font-size: 15px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
            transition: 0.3s;
            color: var(--color-primary);
            transform: translateX(10px);
        }
        & + .item {
            margin-top: 14px;
        }
    }
}
</style>
