<template>
    <div class="base-radio-group">
        <input type="radio" v-model="radioModel" :id="id" :value="value" />
        <label :for="id">{{ label }}</label>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        required: true,
    },
    value: {
        required: true,
    },
    id: {
        type: String,
        required: false,
    },
    label: {
        type: String,
        required: false,
    },
});

const emit = defineEmits(['update:modelValue']);

const radioModel = computed({
    get() {
        return props.modelValue;
    },
    set(newChecked) {
        emit('update:modelValue', newChecked);
    },
});
</script>

<style lang="scss" scoped>
.base-radio-group {
    display: flex;
    align-items: center;
    input[type='radio'] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid var(--color-primary);
        border-radius: 50%;
        outline: none;
        margin-right: 8px;
        &:checked {
            background-color: var(--color-primary);
            border-color: #fff;
        }
    }
}
</style>
