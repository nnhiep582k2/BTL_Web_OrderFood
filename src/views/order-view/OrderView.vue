<template>
    <div
        class="my-order-container"
        :class="filterBills.length > 0 ? '' : 'fit-screen'"
        v-if="authData?.userId"
    >
        <div v-if="filterBills.length > 0" class="my-order-cards">
            <div
                v-for="b in filterBills.slice().reverse()"
                class="card"
                :key="b?.billId"
            >
                <div
                    class="card-head d-flex flex-wrap flex-sm-nowrap justify-content-between"
                >
                    <div>
                        <span>Order No - </span>
                        <span>{{ b?.billId }}</span>
                    </div>
                    <BaseButton
                        :type="ButtonType.warning"
                        text="show order details"
                        @click="() => sendBillId(b?.billId)"
                    />
                </div>

                <div
                    class="d-flex flex-wrap flex-sm-nowrap justify-content-between card-summary"
                >
                    <div class="w-100 text-center py-1 px-2">
                        <span>Paid:</span>{{ " " + b?.paid }}
                    </div>
                    <div class="w-100 text-center py-1 px-2">
                        <span>Status:</span
                        >{{ " " + avaiableStatus[b?.status] }}
                    </div>
                    <div class="w-100 text-center py-1 px-2">
                        <span>When:</span> {{ b?.createdDate }}
                    </div>
                </div>
                <div
                    class="d-flex flex-wrap flex-sm-nowrap justify-content-between card-summary"
                >
                    <div class="w-100 text-center py-1 px-2">
                        <span>Total:</span> ${{ b?.total }}
                    </div>
                    <div class="w-100 text-center py-1 px-2">
                        <span>Address:</span>{{ " " + b?.address }}
                    </div>
                    <div class="w-100 text-center py-1 px-2">
                        <span>Phone:</span>{{ " " + b?.phoneNumber }}
                    </div>
                </div>

                <div class="card-body">
                    <div
                        class="steps d-flex flex-wrap flex-sm-nowrap justify-content-between"
                    >
                        <div
                            class="step"
                            :class="b?.status >= 1 ? 'completed' : ''"
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
                            :class="b?.status >= 2 ? 'completed' : ''"
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
                            :class="b?.status >= 3 ? 'completed' : ''"
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
                            :class="b?.status >= 4 ? 'completed' : ''"
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
                            :class="b?.status >= 5 ? 'completed' : ''"
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

    <BaseNoPermission v-else />
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import { computed, reactive, ref, watch } from "vue";
import OrderDetails from "./OrderDetails.vue";
import { ButtonType } from "@/enums/ButtonType";
import http from "@/services/http/http";
import { useStore } from "vuex";
import { notify } from "@/services/Toast";
import { TypeToast } from "@/enums/TypeToast";
import { SET_LOADING } from "@/stores/storeConstants";
import BaseNoPermission from '@/components/BaseNoPermission.vue'
const avaiableStatus = reactive([
    "cancel",
    "confirmed",
    "preparing",
    "checking",
    "delivering",
    "delivered",
]);

interface IBills{
    billId: string,
    paid: string,
    status: number,
    createdDate: string,
    address: string,
    total: number,
    phoneNumber: string
}

const store = useStore();
const allBills = ref<IBills[]>([]);
const showOrderDetails = ref<boolean>(false);
const sendId = ref<string>("");
const interval = ref<string>("");
const authData = computed(() => store.getters["getAuthData"]);
const filterBills = computed(() => {
    return allBills.value.filter((b) => b.status < 6 && b.status > 0);
});



const getAllBills = async () => {
    try {
        store.dispatch(SET_LOADING, true);
        if (authData.value?.userId) {
            const { data } = await http.get(
                `/Bills/GetAllRecord?recordId=${authData.value?.userId}`
            );
            if (data?.success) {
                allBills.value = data.data;
                allBills.value.map(el=>{
                    if(el.createdDate){
                        const dateTime = new Date(el.createdDate);
                        const date = dateTime.getDate();
                        const month = dateTime.getMonth() + 1;
                        const year = dateTime.getFullYear();
                        const hours = dateTime.getHours();
                        const minutes = dateTime.getMinutes();
                        const seconds = dateTime.getSeconds();
                        el.createdDate =  `${hours}:${minutes}:${seconds} - ${date}/${month}/${year}`;
                    }
                    return el;
                })
            }
        }
    } catch (error: any) {
        notify(`${error?.response?.data?.message}`, TypeToast.error);
    } finally {
        store.dispatch(SET_LOADING, false);
    }
};

getAllBills();

const closeView = () => {
    showOrderDetails.value = false;
};

const sendBillId = (id?: string) => {
    sendId.value = id || "23423";
    showOrderDetails.value = true;
};
</script>

<style lang="scss" scoped>
@import url(./OrderViewStyle.scss);
</style>
