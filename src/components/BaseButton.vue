<template>
    <div
        class="base-button"
        :class="[type, disabled ? 'disabled' : '', className]"
        @click="() => $emit('click')"
    >
        {{ text }}
    </div>
</template>

<script setup lang="ts">
import { ButtonType } from '@/enums/ButtonType.ts';

interface IProps {
    type: ButtonType;
    text: string;
    disabled?: boolean;
    className?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    type: ButtonType.default,
    text: 'Button',
    disabled: false,
});
</script>

<style lang="scss" scoped>
.base-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 12px 14px;
    border-radius: 6px;
    height: var(--height-control);
    font-size: var(--fontsize-control);
    user-select: none;
    width: fit-content;
    font-weight: 500;
    & + .base-button {
        margin-left: 10px;
    }
    &:hover {
        cursor: pointer;
    }
    &.default {
        color: white;
        background-color: var(--color-default);
        &:hover {
            background-color: var(--color-default-bolder);
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
    &.disabled {
        cursor: not-allowed;
        background-color: var(--color-disabled);
        &:hover {
            background-color: var(--color-disabled);
        }
    }
}
</style>
