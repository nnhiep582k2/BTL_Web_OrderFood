<template>
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
