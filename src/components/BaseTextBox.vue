<template>
    <div
        class="base-text-box"
        :class="{ 'd-flex': type == TextBoxType.hasButton }"
    >
        <label>
            <span v-show="label">{{ label }}</span>
            <input
                :type="inputType"
                :value="modelValue"
                :style="`width: ${width}`"
                :placeholder="placeholder"
                :class="classes"
                @change="handleChangeValue"
            />
        </label>
        <BaseButton
            v-if="type == TextBoxType.hasButton"
            :text="buttonText"
            :type="buttonType"
            @click="handleClickButton"
        />
    </div>
</template>

<script setup lang="ts">
import { ButtonType } from '@/enums/ButtonType';
import { InputType, TextBoxType } from '@/enums/TextBoxType';
import BaseButton from './BaseButton.vue';

interface IProps {
    modelValue: string;
    width?: string;
    classes?: string;
    type?: TextBoxType;
    inputType?: InputType;
    buttonType?: ButtonType;
    buttonText?: string;
    placeholder?: string;
    label?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    width: '236px',
    type: TextBoxType.default,
    buttonType: ButtonType.success,
    buttonText: 'Subscribe',
    inputType: InputType.text,
});

const emit = defineEmits(['update:modelValue', 'clickButton']);

const handleChangeValue = (e: Event) => {
    emit('update:modelValue', (e?.target as HTMLInputElement)?.value);
};

const handleClickButton = () => {
    console.log('Click button text box');
};
</script>

<style lang="scss" scoped>
.base-text-box {
    width: 100%;
    label span {
        display: block;
        margin-bottom: 8px;
    }
    input {
        display: block;
        padding: 8px 10px;
        font-size: 14px;
        background-color: white;
        border-radius: 4px;
        border: 1px solid #ccc;
        height: var(--height-control);
        outline-color: var(--color-primary);
    }
    &.d-flex {
        input {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
        .base-button {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }
}
</style>
