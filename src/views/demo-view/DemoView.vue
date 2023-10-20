<template>
    <div class="demo-view p-x-80">
        <h2 class="m-b-10">DEMO CONTROL - nnhiep</h2>
        <BaseButton
            class="m-b-10"
            text="Order Now"
            :type="ButtonType.warning"
        />
        <BaseTextBox class="m-b-10" v-model:model-value="textBoxValue" />
        <BaseTextArea class="m-b-10" v-model:model-value="textBoxValue" />
        <div class="d-flex m-b-10">
            <BaseAds
                v-for="(item, index) in DataBaseAds"
                :src="item.src"
                :key="index"
            >
                <template #content>
                    <div class="title">{{ item.title }}</div>
                    <div class="discount">{{ item.discount }}</div>
                    <base-button
                        :type="item.button.type"
                        :text="item.button.text"
                    />
                </template>
            </BaseAds>
        </div>
        <BasePromotion
            class="m-b-10"
            v-for="(item, index) in DataBasePromotions"
            :src="item.src"
            :key="index"
            :title="item.title"
            :datas="item.datas"
        />
        <BaseSelectBox
            class="m-b-10"
            v-model="testing.value"
            :options="options"
        />
        <BaseCheckbox
            class="m-b-10"
            id="checkedTask"
            label="checked"
            v-model="testing.selected"
        />
        <BaseRadioGroup
            class="m-b-10"
            id="radioCheck"
            label="radioCheck"
            v-model="testing.radioCheck"
            value="First"
        />
        <BaseRadioGroup
            class="m-b-10"
            id="radioCheck2"
            label="radioCheck2"
            v-model="testing.radioCheck"
            value="second"
        />
        <BaseMap class="m-b-10" width="500" height="600" />
    </div>
</template>

<script setup lang="ts">
import BaseAds from '@/components/BaseAds.vue';
import BaseButton from '@/components/BaseButton.vue';
import BasePromotion from '@/components/BasePromotion.vue';
import BaseMap from '@/components/BaseMap.vue';
import BaseSelectBox from '@/components/BaseSelectBox.vue';
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import BaseRadioGroup from '@/components/BaseRadioGroup.vue';
import BaseTextBox from '@/components/BaseTextBox.vue';
import BaseTextArea from '@/components/BaseTextArea.vue';
import { ButtonType } from '@/enums/ButtonType';
import { DataBaseAds } from '@/mocks/BaseAds';
import { DataBasePromotions } from '@/mocks/BasePromotions';
import { reactive, ref, watch } from 'vue';

window.scrollTo(0, 0);

const testing = reactive({
    value: '',
    selected: '',
    radioCheck: false,
});

const options = [
    {
        label: 'Normal',
        value: 'Normal',
    },
    {
        label: 'high',
        value: 'high',
    },
];

watch(testing, (_, __) => {
    console.log(testing);
});

const textBoxValue = ref<string>('');

watch(
    () => textBoxValue.value,
    (newValue) => {
        console.log(newValue);
    }
);
</script>

<style lang="scss" scoped>
.title,
.discount {
    margin-bottom: 4px;
    text-shadow: 1px 1px 4px #000000;
}
.discount {
    font-size: 30px;
    font-weight: 500;
}
</style>
