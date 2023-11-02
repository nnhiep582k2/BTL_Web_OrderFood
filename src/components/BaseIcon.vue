<template>
    <div class="base-icon" :class="[type, classes]" @click="$emit('click')">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { IconType } from '@/enums/IconType';

interface IProps {
    type?: IconType;
    classes?: string
}

const props = withDefaults(defineProps<IProps>(), {
    type: IconType.default,
});
</script>

<style lang="scss" scoped>
.base-icon {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    & + .base-icon {
        margin-left: 6px;
    }
    &.default {
        color: black;
        background-color: #e7e7e7;
        &:hover {
            color: white;
            background-color: var(--color-primary);
        }
    }
    &.success {
        color: white;
        background-color: var(--color-primary);
        &:hover {
            background-color: var(--color-primary-bolder);
        }
    }
    &.failure {
        color: white;
        background-color: var(--color-failure);
        &:hover {
            background-color: var(--color-failure-bolder);
        }
    }
    &.warning {
        color: white;
        background-color: var(--color-warning);
        &:hover {
            background-color: var(--color-warning-bolder);
        }
    }
    &.information {
        color: white;
        background-color: var(--color-information);
        &:hover {
            background-color: var(--color-information-bolder);
        }
    }
}
</style>
