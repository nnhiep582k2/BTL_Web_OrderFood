<template>
    <div class="base-text-area">
        <label>
            <span v-show="label">{{ label }}</span>
            <textarea
                :value="modelValue"
                :style="`width: ${width};height: ${height}`"
                :placeholder="placeholder"
                @input="handleChangeValue"
            />
        </label>
    </div>
</template>

<script setup lang="ts">
interface IProps {
    modelValue: string;
    width?: string;
    height?: string;
    placeholder?: string;
    label?: string;
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
    label span {
        display: block;
        margin-bottom: 8px;
    }
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
