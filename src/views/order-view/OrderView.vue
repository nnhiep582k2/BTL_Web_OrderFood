<template>
    <div
        class="my-order-container"
        :class="filterBills.length > 0 ? '' : 'fit-screen'"
    >
        <div v-if="filterBills.length > 0" class="my-order-cards">
            <div
                v-for="b in filterBills.slice().reverse()"
                class="card"
                :key="b?.bill_id"
            >
                <div
                    class="card-head d-flex flex-wrap flex-sm-nowrap justify-content-between"
                >
                    <div>
                        <span>Order No - </span>
                        <span>{{ b?.bill_id }}</span>
                    </div>
                    <BaseButton
                        :type="ButtonType.warning"
                        text="show order details"
                        @click="() => sendBillId(b?.bill_id)"
                    />
                </div>

                <div
                    class="d-flex flex-wrap flex-sm-nowrap justify-content-between card-summary"
                >
                    <div class="w-100 text-center py-1 px-2">
                        <span>Paid:</span>{{ ' ' + b?.bill_paid }}
                    </div>
                    <div class="w-100 text-center py-1 px-2">
                        <span>Status:</span
                        >{{ ' ' + avaiableStatus[b?.bill_status] }}
                    </div>
                    <div class="w-100 text-center py-1 px-2">
                        <span>When:</span> {{ b?.bill_when }}
                    </div>
                </div>
                <div
                    class="d-flex flex-wrap flex-sm-nowrap justify-content-between card-summary"
                >
                    <div class="w-100 text-center py-1 px-2">
                        <span>Total:</span> ${{ b?.bill_total }}
                    </div>
                    <div class="w-100 text-center py-1 px-2">
                        <span>Address:</span>{{ ' ' + b?.bill_address }}
                    </div>
                    <div class="w-100 text-center py-1 px-2">
                        <span>Phone:</span>{{ ' ' + b?.bill_phone }}
                    </div>
                </div>

                <div class="card-body">
                    <div
                        class="steps d-flex flex-wrap flex-sm-nowrap justify-content-between"
                    >
                        <div
                            class="step"
                            :class="b?.bill_status >= 1 ? 'completed' : ''"
                        >
                            <div class="step-icon-wrap">
                                <div class="step-icon">
                                    <i class="fa-solid fa-utensils"></i>
                                </div>
                            </div>
                            <h4 class="step-title">Confirmed</h4>
                        </div>
                        <div
                            class="step"
                            :class="b?.bill_status >= 2 ? 'completed' : ''"
                        >
                            <div class="step-icon-wrap">
                                <div class="step-icon">
                                    <i class="fa-solid fa-fire-burner"></i>
                                </div>
                            </div>
                            <h4 class="step-title">Preparing</h4>
                        </div>
                        <div
                            class="step"
                            :class="b?.bill_status >= 3 ? 'completed' : ''"
                        >
                            <div class="step-icon-wrap">
                                <div class="step-icon">
                                    <i class="fa-solid fa-list-check"></i>
                                </div>
                            </div>
                            <h4 class="step-title">Checking</h4>
                        </div>
                        <div
                            class="step"
                            :class="b?.bill_status >= 4 ? 'completed' : ''"
                        >
                            <div class="step-icon-wrap">
                                <div class="step-icon">
                                    <i class="fa-solid fa-route"></i>
                                </div>
                            </div>
                            <h4 class="step-title">Delivering</h4>
                        </div>
                        <div
                            class="step"
                            :class="b?.bill_status >= 5 ? 'completed' : ''"
                        >
                            <div class="step-icon-wrap">
                                <div class="step-icon">
                                    <i class="fa-solid fa-house"></i>
                                </div>
                            </div>
                            <h4 class="step-title">Delivered</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="box-content row no-food">
            <div class="content">
                <h2 style="color: #057835fa">You do not have any orders yet</h2>
            </div>
            <div>
                <img src="/src/assets/images/template/no-orders.png" alt="" />
            </div>
            <RouterLink class="btn" to="/menu">Order now!</RouterLink>
        </div>

        <OrderDetails v-if="showOrderDetails" :bill="sendId">
            <BaseButton
                text="X"
                :type="ButtonType.success"
                @click="() => closeView()"
            />
        </OrderDetails>
    </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import { computed, reactive, ref, watch } from 'vue';
import OrderDetails from './OrderDetails.vue';
import { ButtonType } from '@/enums/ButtonType';

const avaiableStatus = reactive([
    'cancel',
    'confirmed',
    'preparing',
    'checking',
    'delivering',
    'delivered',
]);

const allBills = reactive([]);
const showOrderDetails = ref<boolean>(false);
const sendId = ref<string>('');
const interval = ref<string>('');

const filterBills = computed(() => {
    return new Array(3);
});

watch(
    () => showOrderDetails.value,
    (newValue) => {
        console.log(newValue);
    }
);

const getAllBills = async () => {};

const closeView = () => {
    showOrderDetails.value = false;
};

const sendBillId = (id?: string) => {
    sendId.value = id || '23423';
    showOrderDetails.value = true;
};
</script>

<style lang="scss" scoped>
@import url(./OrderViewStyle.scss);
</style>
