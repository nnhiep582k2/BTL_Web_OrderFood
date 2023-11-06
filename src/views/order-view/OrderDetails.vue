<template>
    <div class="order-details">
        <div class="order-details-inner">
            <h2 class="d-flex justify-content-between">
                Order summary
                <slot></slot>
            </h2>
            <div
                class="d-flex flex-wrap h-50 flex-row"
                style="overflow-y: auto"
            >
                <div
                    style="flex: 50%"
                    v-for="(f, index) in filterFoods"
                    :key="f?.foodId"
                >
                    <div class="product-detail d-flex">
                        <div class="image">
                            <img
                                :src="f?.url"
                                alt=""
                            />
                        </div>
                        <div class="content">
                            <p class="name">
                                {{ f?.foodName }}
                                <span>X {{ item_qty[index] }}</span>
                            </p>
                            <p class="desc">{{ f?.foodDesc }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="price">
                <p>Discount: ${{ billMatch.discount }}</p>
                <p>Delivery Fee: ${{ billMatch.delivery }}</p>
                <p>Total: ${{ billMatch.total }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import http from '@/services/http/http';
import { useStore } from 'vuex';
import { SET_LOADING } from '@/stores/storeConstants';

const props = defineProps({
    bill: {
        type: String,
        required: true,
    },
});

interface IBillMatch {
    discount: String;
    delivery: String;
    total: String;
}
const store = useStore();
const allFoods = computed(() => store.state.allFoods);
const allFoodsInBill = ref<any[]>([]);
const item_qty = ref<any[]>([]);
const billMatch = ref<IBillMatch>({
    discount: '',
    delivery: '',
    total: '',
});

const filterFoods = computed(() => {
    if (allFoodsInBill.value) {
        return allFoods.value.filter((f) => matchID(f, allFoodsInBill.value));
    }
});

const matchID = (food, cartArray) => {
    let temp = null;
    cartArray.forEach((element) => {
        if (food.foodId == element) {
            temp = food;
        }
    });
    return temp;
};

const getAllBillDetails = async () => {
    if (props.bill) {
        try {
            store.dispatch(SET_LOADING, true);
            let { data } = (
                await http.get(
                    `/BillDetails/GetAllRecord?recordId=${props.bill}`
                )
            ).data;
            data.forEach((element: any) => {
                allFoodsInBill.value.push(element?.foodId);
                item_qty.value.push(element?.quantity);
            });
            store.dispatch(SET_LOADING, false);
        } catch (error) {
            store.dispatch(SET_LOADING, false);
        } finally {
            store.dispatch(SET_LOADING, false);
        }
    }
};

getAllBillDetails();

const getBillStatus = async () => {
    try {
        if (props.bill) {
            store.dispatch(SET_LOADING, true);

            let { data } = (
                await http.get(`/Bills/GetById?recordId=${props.bill}`)
            ).data;
            billMatch.value = data;
            store.dispatch(SET_LOADING, false);
        }
    } catch (error) {
        store.dispatch(SET_LOADING, false);
    } finally {
        store.dispatch(SET_LOADING, false);
    }
};

getBillStatus();
</script>

<style lang="scss" scoped>
@import url(./OrderDetailsStyle.scss);
</style>
