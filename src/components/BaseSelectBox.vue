<template>
    <select
        class="select"
        :id="id"
        :name="name"
        :class="classes"
        :value="modelValue"
        @input="
            $emit(
                'update:modelValue',
                ($event?.target as HTMLInputElement).value
            )
        "
    >
        <option
            class="option"
            v-for="option in options"
            :value="option.value"
            :key="JSON.stringify(option)"
        >
            {{ option.label }}
        </option>
    </select>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

type OptionTypes = {
    label: String;
    value: String;
};

defineProps({
    id: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    classes: {
        type: String,
        required: false,
    },
    modelValue: {
        type: String,
        required: false,
    },
    required: {
        type: String,
        required: false,
    },
    options: {
        type: Array as PropType<OptionTypes[]>,
        default: true,
    },
});
</script>

<style lang="scss" scoped>
.select {
    width: 150px;
    height: var(--height-control);
    user-select: none;
    outline: none;
    border-radius: 6px;
    font-size: var(--fontsize-control);
    border: 1px solid #ccc;
    padding: 10px 12px 9px;
    .option {
        height: 100%;
        padding: 10px 12px 9px;
    }
}
</style>
