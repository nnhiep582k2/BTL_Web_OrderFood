<template>
<<<<<<< HEAD
    <h2>DEMO CONTROL - nnhiep</h2>
    <base-button :type="ButtonType.warning" text="Order Now" />
    <BaseSelectBox :options="options" v-model="testing.value" />
    <BaseCheckbox id="checkedTask" label="checked" v-model="testing.selected" />
    <BaseRadioGroup
        id="radioCheck"
        label="radioCheck"
        v-model="testing.radioCheck"
        value="First"
    />
    <BaseRadioGroup
        id="radioCheck2"
        label="radioCheck2"
        v-model="testing.radioCheck"
        value="second"
    />

    <BaseMap width="500" height="600"  />

</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import { ButtonType } from "@/enums/ButtonType";
import { reactive, watch } from "vue";
import BaseSelectBox from "@/components/BaseSelectBox.vue";
import BaseCheckbox from "@/components/BaseCheckbox.vue";
import BaseRadioGroup from "@/components/BaseRadioGroup.vue";
import BaseMap from "@/components/BaseMap.vue";
const testing = reactive({
    value: "",
    selected: "",
    radioCheck: false,
});

const options = [
    {
        label: "Normal",
        value: "Normal",
    },
    {
        label: "high",
        value: "high",
    },
];

watch(testing, (_, __) => {
    console.log(testing);
});
=======
    <div class="home-view">
        <h2 class="m-b-10">DEMO CONTROL - nnhiep</h2>
        <base-button
            class="m-b-10"
            :type="ButtonType.warning"
            text="Order Now"
        />
        <div class="d-flex m-b-10">
            <base-ads
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
            </base-ads>
        </div>
        <base-promotion
            class="m-b-10"
            v-for="(item, index) in DataBasePromotions"
            :src="item.src"
            :key="index"
            :title="item.title"
            :datas="item.datas"
        />
    </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseAds from '@/components/BaseAds.vue';
import BasePromotion from '@/components/BasePromotion.vue';
import { ButtonType } from '@/enums/ButtonType';
import { DataBaseAds } from '@/mocks/BaseAds';
import { DataBasePromotions } from '@/mocks/BasePromotions';
>>>>>>> 028f3ade4e66880350aa989356a1eb1fd8b2c139
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
