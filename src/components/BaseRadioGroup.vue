<!-- Author: NTKIEN -->
<template>
    <div>
        <input :id="id" type="radio" v-model="radioModel" :value="value" />
        <label :for="id">{{ label }} </label>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

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

const emit = defineEmits(["update:modelValue"]);

const radioModel = computed({
    get() {
        return props.modelValue;
    },
    set(newChecked) {
        emit("update:modelValue", newChecked);
    },
});
</script>

<style lang="scss" scoped>
input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid var(--active);
    border-radius: 50%;
    outline: none;
    margin-right: 8px;
}

input[type="radio"]:checked {
    background-color: var(--active);
    border-color: #fff;
}
</style>
