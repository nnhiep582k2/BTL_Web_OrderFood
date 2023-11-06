<template>
    <vue-basic-alert :duration="300" :closeIn="2000" ref="alert" />
    <div v-if="authData.userId" class="quick-view">
        <div class="quick-view-inner" :key="food?.foodDesc">
            <div class="header-quick-view">
                <h2>{{ food?.foodName }}</h2>
                <slot></slot>
            </div>
            <div class="product-detail d-flex">
                <div class="image">
                    <img
                        :src="`/src/assets/images/template/${food?.url}`"
                        alt=""
                    />
                </div>
                <div class="content">
                    <p class="desc">{{ food?.foodDesc }}</p>
                    <p class="money">
                        ${{
                            parseFloat(food?.price) -
                            parseFloat(food?.foodDiscount)
                        }}<span v-if="parseFloat(food?.FoodDiscount) > 0"
                            >${{ parseFloat(food?.price) }}</span
                        >
                    </p>
                    <div class="qty">
                        <label for="qty">Quantity:</label>
                        <input
                            type="number"
                            name="qty"
                            id="qty"
                            min="1"
                            max="1000"
                            v-model="theQuantity"
                        />
                    </div>
                    <BaseButton
                        class="btn"
                        text="Add to cart"
                        :type="ButtonType.success"
                        @click="addToCart()"
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
import { useStore } from 'vuex';
import http from '@/services/http/http';
import { notify } from '@/services/Toast';
import { TypeToast } from '@/enums/TypeToast';

interface IProps {
    food: any;
}

const store = useStore();
const props = defineProps<IProps>();
const authData = computed(() => store.getters['getAuthData']);
const theQuantity = ref<number>(0);
const alert = ref();
let firstLoad = ref<boolean>(true);

const addToCart = async () => {
    if (!firstLoad.value) return;
    firstLoad.value = false;

    try {
        let cartObj = {
            foodId: props.food?.foodId,
            userId: authData.value?.userId,
            quantity: theQuantity.value,
        };

        let response = await http.post(
            '/Carts/addToCart',
            JSON.stringify(cartObj)
        );

        if (response.data?.success) {
            alert.value.showAlert(
                'success',
                'Thank you! We will call you soon to confirm your order',
                'Add To Cart Successfully!'
            );
        }
    } catch (e) {
        notify('Add fail!', TypeToast.error);
    }
};
</script>

<style lang="scss" scoped>
@import url(./QuickViewStyle.scss);
</style>
