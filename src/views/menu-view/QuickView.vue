<template>
    <vue-basic-alert :duration="300" :closeIn="2000" ref="alert" />
    <div v-if="user" class="quick-view">
        <div
            class="quick-view-inner"
            v-for="f in selectedFood"
            :key="f?.food_desc"
        >
            <h2 class="d-flex justify-content-between">
                {{ f?.food_name }}
                <slot></slot>
            </h2>
            <div class="product-detail d-flex">
                <div class="image">
                    <img
                        :src="`/src/assets/images/template/${f?.food_src}`"
                        alt=""
                    />
                </div>
                <div class="content">
                    <p class="desc">{{ f?.food_desc }}</p>
                    <p class="money">
                        ${{
                            parseFloat(f?.food_price) -
                            parseFloat(f?.food_discount)
                        }}<span v-if="parseFloat(f?.food_discount) > 0"
                            >${{ parseFloat(f?.food_price) }}</span
                        >
                    </p>
                    <div class="qty">
                        <label for="qty">Quantity:</label>
                        <input
                            type="number"
                            name="qty"
                            id="qty"
                            value="1"
                            min="1"
                            max="1000"
                            @change="onQtyChange($event)"
                        />
                    </div>
                    <BaseButton
                        class="btn"
                        text="Add to cart"
                        :type="ButtonType.success"
                        @click="addToCart"
                    />
                </div>
            </div>
        </div>
    </div>
    <div v-else class="quick-view">
        <div class="quick-view-inner">
            <h2 class="d-flex justify-content-between">
                Please login to use this method
                <slot></slot>
            </h2>
            <div
                class="link-to-login"
                style="text-align: center; margin-top: 120px"
            >
                <RouterLink
                    class="btn"
                    to="/login"
                    style="padding: 28px; font-size: 24px"
                    >Login now
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import { computed, ref } from 'vue';
import VueBasicAlert from 'vue-basic-alert';
import { ButtonType } from '@/enums/ButtonType';

defineProps({
    food: {
        type: String,
    },
});

interface IFood {
    food_name: string;
    food_src: string;
    food_desc: string;
    food_price: string;
    food_discount: string;
}

const qty = ref<Number>(1);
const user = ref('5345');

const selectedFood = computed<IFood[]>(() => {
    return [
        {
            food_name: '345345',
            food_src: '',
            food_desc: '',
            food_price: '',
            food_discount: '',
        },
    ];
});

const onQtyChange = (e: Event) => {};

const addToCart = async () => {};
</script>

<style lang="scss" scoped>
@import url(./QuickViewStyle.scss);
</style>
