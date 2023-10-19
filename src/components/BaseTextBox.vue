<template>
    <div class="base-text-box">
        <input
            type="text"
            :value="modelValue"
            :style="`width: ${width}`"
            @change="handleChangeValue"
        />
    </div>
</template>

<script setup lang="ts">
interface IProps {
    modelValue: string;
    width?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    width: '236px',
});

const handleChangeValue = (e: Event) => {
    console.log((e?.target as HTMLInputElement)?.value);
};
</script>

<style lang="scss" scoped>
.base-text-box {
    input {
        display: block;
        padding: 8px 10px;
        background-color: white;
        border-radius: 4px;
        border: 1px solid #ccc;
        height: var(--height-control);
        outline-color: var(--color-primary);
    }
}
</style>
