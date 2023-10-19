<template>
    <div class="base-text-area">
        <textarea
            :value="modelValue"
            :style="`width: ${width};height: ${height}`"
            @input="handleChangeValue"
        />
    </div>
</template>

<script setup lang="ts">
interface IProps {
    modelValue: string;
    width?: string;
    height?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    width: '236px',
    height: '80px',
});

const emit = defineEmits(['update:modelValue']);

const handleChangeValue = (e: Event) => {
    emit('update:modelValue', (e?.target as HTMLInputElement)?.value);
};
</script>

<style lang="scss" scoped>
.base-text-area {
    textarea {
        display: block;
        padding: 8px 10px;
        background-color: white;
        border-radius: 4px;
        font-size: 14px;
        border: 1px solid #ccc;
        outline-color: var(--color-primary);
    }
}
</style>
