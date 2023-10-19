<template>
    <div class="base-promotion d-flex">
        <div class="promotion-left">
            <img :src="src" :alt="alt" />
        </div>
        <div class="promotion-right">
            <div class="promotion-title">{{ title }}</div>
            <div class="promotion-list">
                <div
                    class="promotion-item m-b-20"
                    v-for="(data, index) in datas"
                    :key="index"
                >
                    {{ data }}
                </div>
            </div>
            <base-button :type="buttonType" :text="buttonText" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ButtonType } from '@/enums/ButtonType';
import BaseButton from './BaseButton.vue';

interface IProps {
    title: string;
    src: string;
    alt?: string;
    buttonType?: ButtonType;
    buttonText?: string;
    datas?: string[];
}

const props = withDefaults(defineProps<IProps>(), {
    src: '',
    alt: '',
    buttonType: ButtonType.success,
    buttonText: 'Order Now',
});
</script>

<style lang="scss" scoped>
.base-promotion {
    .promotion-left {
        width: 278px;
        height: 300px;
        overflow: hidden;
        border-radius: 10px;
        margin-right: 50px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .promotion-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .promotion-title {
            font-size: 28px;
            color: var(--color-primary);
            margin-bottom: 20px;
            font-weight: 500;
        }
    }
    .promotion-list {
        margin-bottom: 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .promotion-item {
            position: relative;
            font-size: 20px;
            margin-left: 16px;
            &::after {
                content: '';
                position: absolute;
                top: 50%;
                left: -16px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                transform: translateY(-50%);
                background-color: black;
            }
        }
    }
}
</style>
