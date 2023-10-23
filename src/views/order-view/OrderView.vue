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
            <router-link class="btn" to="/menu">Order now!</router-link>
        </div>

        <OrderDetails v-if="showOrderDetails" :bill="sendId">
            <BaseButton
                @click="() => closeView()"
                text="X"
                :type="ButtonType.success"
            />
        </OrderDetails>
    </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import { computed, reactive, ref, watch } from 'vue';
import OrderDetails from './OrderDetails.vue';
import { ButtonType } from '@/enums/ButtonType';

/**----------variable----------*/
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

/**----------computed----------*/
const filterBills = computed(() => {
    return new Array(3);
});

watch(
    () => showOrderDetails.value,
    (newValue) => {
        console.log(newValue);
    }
);

/**----------method----------*/
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
.my-order-container {
    padding: 2rem 9%;
    background: #fff;
    height: 100%;
    &.fit-screen {
        height: 90vh;
    }
}

.my-order-cards {
    margin-bottom: 2rem;
}

.card {
    margin-bottom: 10px;
    border-radius: 4px;
}

.card-head {
    padding: 12px 15px;
    color: white;
    font-size: 16px;
    background: var(--color-primary);
    button {
        background-color: inherit;
        color: white;
        margin-right: 20px;
        font-weight: 500;

        &:hover {
            color: #f38609;
        }
    }
}

.card-summary {
    padding: 12px 10px;
    background: #eee;
    font-size: 14px;
}

.steps .step {
    display: block;
    width: 100%;
    margin-bottom: 35px;
    text-align: center;
}

.steps .step .step-icon-wrap {
    display: block;
    position: relative;
    width: 100%;
    height: 80px;
    text-align: center;

    &::before,
    &::after {
        display: block;
        position: absolute;
        top: 50%;
        width: 50%;
        height: 3px;
        margin-top: -1px;
        background-color: #e1e7ec;
        content: '';
        z-index: 1;
    }

    &::before {
        left: 0;
    }

    &::after {
        right: 0;
    }
}

.steps .step {
    .step-icon {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
        border: 1px solid #e1e7ec;
        border-radius: 50%;
        background-color: #f5f5f5;
        color: #374250;
        font-size: 38px;
        line-height: 81px;
        z-index: 5;
    }

    .step-title {
        margin-top: 16px;
        margin-bottom: 0;
        color: #606975;
        font-size: 14px;
        font-weight: 500;
    }

    &:first-child .step-icon-wrap::before {
        display: none;
    }
    &:last-child .step-icon-wrap::after {
        display: none;
    }
}

.steps .step.completed {
    .step-icon-wrap::before,
    .step-icon-wrap::after {
        background-color: #0da9ef;
    }

    .step-icon {
        border-color: #0da9ef;
        background-color: #0da9ef;
        color: #fff;
    }
}

.no-food {
    text-align: center;
    justify-content: center;
    display: block;
    width: 100%;
    height: 100%;
    margin: auto;

    a {
        margin-top: 20px;
        margin-left: -10px;
    }
}

@media (max-width: 320px) {
    .my-order-container {
        padding: 0px;
    }

    .card-head {
        font-size: 14px;
    }

    .no-food .content h2 {
        font-size: 14px;
    }
}

@media (max-width: 576px) {
    .my-order-container {
        padding: 1rem 4.5%;
    }

    .flex-sm-nowrap .step .step-icon-wrap::before,
    .flex-sm-nowrap .step .step-icon-wrap::after {
        display: none;
    }

    .card {
        margin-top: 20px;
    }

    .no-food div img {
        width: 85vw;
    }
}

@media (max-width: 768px) {
    .flex-md-nowrap .step .step-icon-wrap::before,
    .flex-md-nowrap .step .step-icon-wrap::after {
        display: none;
    }
}

@media (max-width: 991px) {
    .flex-lg-nowrap .step .step-icon-wrap::before,
    .flex-lg-nowrap .step .step-icon-wrap::after {
        display: none;
    }
}

@media (max-width: 1200px) {
    .flex-xl-nowrap .step .step-icon-wrap::before,
    .flex-xl-nowrap .step .step-icon-wrap::after {
        display: none;
    }
}

.bg-faded,
.bg-secondary {
    background-color: #f5f5f5 !important;
}
</style>
