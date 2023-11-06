<template>
    <vue-basic-alert :duration="300" :closeIn="2000" ref="alert" />
    <div class="row checkout-view">
        <div class="col-75">
            <div class="container">
                <form action="/action_page.php">
                    <div class="row">
                        <div class="col-50">
                            <h3>Billing Address</h3>
                            <label for="fname"
                                ><i class="fa fa-user"></i> Full Name</label
                            >
                            <input
                                type="text"
                                id="fname"
                                name="firstname"
                                disabled
                                v-model="authData.fullName"
                            />
                            <label for="email"
                                ><i class="fa fa-envelope"></i> Email</label
                            >
                            <input
                                type="text"
                                id="email"
                                name="email"
                                disabled
                                v-model="authData.email"
                            />
                        </div>

                        <div class="col-50">
                            <h3>Payment</h3>
                            <label for="fname">Pay directly at the store</label>
                            <div class="icon-container img-wrap">
                                <img
                                    src="/src/assets/images/shop.png"
                                    alt="shop"
                                />
                                <!-- <i
                                    class="fa fa-cc-visa"
                                    style="color: navy"
                                ></i>
                                <i
                                    class="fa fa-cc-amex"
                                    style="color: blue"
                                ></i>
                                <i
                                    class="fa fa-cc-mastercard"
                                    style="color: red"
                                ></i>
                                <i
                                    class="fa fa-cc-discover"
                                    style="color: orange"
                                ></i> -->
                            </div>
                            <!-- <label for="cname">Name on Card</label>
                            <input
                                type="text"
                                id="cname"
                                name="cardname"
                                placeholder="John More Doe"
                            />
                            <label for="ccnum">Credit card number</label>
                            <input
                                type="text"
                                id="ccnum"
                                name="cardnumber"
                                placeholder="1111-2222-3333-4444"
                            /> -->
                        </div>
                    </div>
                    <BaseButton
                        :type="ButtonType.success"
                        className="btn"
                        text="Commit"
                        @click="handleCommit"
                    />
                </form>
            </div>
        </div>

        <div class="col-25">
            <div class="container">
                <h4>
                    Cart
                    <span class="price" style="color: black">
                        <i class="fa fa-shopping-cart"></i>
                        <b>{{ allFoods.length }}</b>
                    </span>
                </h4>
                <p
                    class="info-dish-wrapper"
                    v-for="(item, index) in allFoods"
                    :key="index"
                >
                    <a class="info-dish">
                        <span>{{ item.foodName }}</span>
                        <div class="wrapper">
                            <img :src="item.url" alt="food image" />
                        </div>
                    </a>
                    <span class="price">{{
                        `$ ${calculateItemPrice(item)}`
                    }}</span>
                </p>
                <p>
                    <a>Delivery</a>
                    <span class="price">$ 15.00</span>
                </p>
                <hr />
                <p>
                    Total
                    <span class="price" style="color: black"
                        ><b>{{ `$ ${calculateSummaryPrice()[3]}` }}</b></span
                    >
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import http from '@/services/http/http';
import BaseButton from '@/components/BaseButton.vue';
import { ButtonType } from '@/enums/ButtonType';
import { notify } from '@/services/Toast';
import { TypeToast } from '@/enums/TypeToast';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import VueBasicAlert from 'vue-basic-alert';

window.scrollTo(0, 0);

const theData = ref<any>({
    userId: '',
    paid: '',
    status: '',
    total: '',
    method: '',
    discount: '',
    delivery: '',
});
let allFoods = ref<any[]>([]);
const store = useStore();
const authData = computed(() => store.getters['getAuthData']);

const getCartInfo = async () => {
    try {
        let { data } = (
            await http.get(
                `/Carts/getCartInfo?userId=${authData.value?.userId}`
            )
        ).data;
        allFoods.value = [...data];
    } catch (error) {
        notify('Lỗi lấy dữ liệu thanh toán', TypeToast.error);
    }
};

onMounted(() => {
    if (authData.value.userId) getCartInfo();
});

const calculateSummaryPrice = () => {
    let subtotal: number = allFoods.value.reduce(
        (total, current) => total + current.price * current.quantity,
        0
    );
    let discount: number = allFoods.value.reduce(
        (total, current) =>
            total +
            ((current.price * current.foodDiscount) / 100) * current.quantity,
        0
    );
    let delivery: number = 15;
    let total: number = subtotal - discount + delivery;

    theData.value.total = total;

    return [
        subtotal.toFixed(2),
        discount.toFixed(2),
        delivery.toFixed(2),
        total.toFixed(2),
    ];
};

const calculateItemPrice = (item: any) => {
    return (
        (parseFloat(item.price) -
            (parseFloat(item.foodDiscount) * parseFloat(item.price)) / 100) *
        item.quantity
    )
        .toFixed(2)
        .toString();
};

const alert = ref();
let isFirstLoad = ref<boolean>(true);

const handleCommit = async () => {
    if (!isFirstLoad.value) return;
    isFirstLoad.value = false;
    let result = {
        userId: authData.value.userId,
        status: 0,
        total: Number.parseFloat(calculateSummaryPrice()[3]),
        delivery: 15,
        discount: Number.parseFloat(calculateSummaryPrice()[1]),
        method: 'card',
        paid: 'false',
    };
    try {
        const { data } = await http.post(
            '/Bills/addRecord',
            JSON.stringify(result)
        );

        if (data.success) {
            alert.value.showAlert(
                'success',
                'Checkout Successfully!',
                'Successfully!'
            );
        }
    } catch (e) {
        notify('Lỗi thanh toán', TypeToast.error);
    }
};
</script>

<style lang="scss" scoped>
@import url(./style.scss);
</style>
