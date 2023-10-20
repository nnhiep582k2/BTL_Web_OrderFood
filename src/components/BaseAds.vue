<template>
    <div class="base-ads" :style="{ width: width }">
        <div class="base-ads-img">
            <img :src="src" :alt="alt" />
        </div>
        <div class="base-ads-content">
            <slot name="content" />
        </div>
    </div>
</template>

<script setup lang="ts">
interface IProps {
    src: string;
    alt?: string;
    width?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    src: '',
    alt: '',
    width: '350px',
});
</script>

<style lang="scss">
.base-ads {
    height: 450px;
    border-radius: 6px;
    position: relative;
    &:hover {
        cursor: pointer;
        .base-ads-img {
            img {
                transform: scale(1.1);
                transition: 0.3s;
            }
        }
    }
    & + & {
        margin-left: 32px;
    }
    .base-ads-content {
        position: absolute;
        top: 16px;
        left: 16px;
        color: white;
        font-size: 25px;
    }
    .base-ads-img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 0.3s;
        }
    }
}
</style>
