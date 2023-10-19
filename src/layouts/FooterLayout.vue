<template>
    <div class="footer">
        <div class="footer-title">Receive Event Notifications</div>
        <p class="input">
            <BaseTextBox
                width="580px"
                placeholder="Enter your email"
                v-model:model-value="emailValue"
                :type="TextBoxType.hasButton"
            />
        </p>
        <div class="wrapper d-flex">
            <BaseListFooter
                v-for="(item, index) in DataListFooter"
                :key="index"
                :title="item.title"
                :datas="item.datas"
            />
        </div>
        <div class="d-flex link">
            <BaseButton text="Facebook" :type="ButtonType.success" />
            <BaseButton text="Twitter" :type="ButtonType.success" />
            <BaseButton text="Instagram" :type="ButtonType.success" />
            <BaseButton text="Tiktok" :type="ButtonType.success" />
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseTextBox from '@/components/BaseTextBox.vue';
import BaseListFooter from '@/components/BaseListFooter.vue';
import BaseButton from '@/components/BaseButton.vue';
import { ButtonType } from '@/enums/ButtonType';
import { DataListFooter } from '@/mocks/ListFooter';
import { TextBoxType } from '@/enums/TextBoxType';
import { ref } from 'vue';

const emailValue = ref<string>('');
</script>

<style lang="scss" scoped>
.footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 530px;
    padding: 30px 80px;
    background-color: var(--color-background);
    .footer-title {
        font-weight: 500;
        font-size: 25px;
        margin-bottom: 16px;
    }
    .input {
        margin-bottom: 16px;
    }
    .wrapper {
        width: 100%;
        justify-content: space-between;
    }
    .link {
        margin: 50px 0 0;
    }
}
</style>
