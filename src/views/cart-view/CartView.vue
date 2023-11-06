<template>
    <vue-basic-alert :duration="300" :closeIn="2000" ref="alert" />
    <div class="shopping-cart-section">
        <div class="heading">
            <span class="cart-title">Shopping cart</span>
            <h3>Good products, fast delivery</h3>
        </div>

        <div class="container">
            <div class="wrapper wrapper-content">
                <div class="row">
                    <div class="in-cart col-md-9">
                        <div class="box">
                            <div class="box-title item-total row">
                                <h3>
                                    <p style="font-size: 15px">
                                        {{ allFoods.length.toString() }}
                                        <span v-if="allFoods.length < 2"
                                            >item</span
                                        >
                                        <span v-else>items</span>
                                    </p>
                                    In your cart
                                </h3>
                            </div>

                            <div v-if="!allFoods.length">
                                <div class="box-content row no-food">
                                    <div class="content">
                                        <h2 style="color: #057835fa">
                                            You do not have any items in your
                                            cart, go shop now!
                                        </h2>
                                    </div>
                                    <div class="image">
                                        <img
                                            src="/src/assets/images/template/notfound.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div
                                    v-for="(f, index) in allFoods as any"
                                    :key="index"
                                >
                                    <div class="box-content row">
                                        <div
                                            class="image-box col-sm-3"
                                            style="padding-left: 0"
                                        >
                                            <img
                                                :src="f.url"
                                                alt=""
                                                class="cart-product-img"
                                            />
                                        </div>

                                        <div class="desc col-sm-4">
                                            <h2 class="item-name">
                                                {{ f.foodName }}
                                            </h2>
                                            <div class="item-desc">
                                                <b>Description</b>
                                                <p>{{ f.foodDesc }}</p>
                                            </div>
                                            <button
                                                class="btn remove-btn"
                                                @click="removeBtn(f)"
                                            >
                                                <i class="fa fa-trash"></i
                                                >Remove item
                                            </button>
                                        </div>

                                        <div class="item-price col-sm-1">
                                            <span class="sale-price"
                                                >${{
                                                    (
                                                        parseFloat(f.price) -
                                                        (f.foodDiscount *
                                                            parseFloat(
                                                                f.price
                                                            )) /
                                                            100
                                                    ).toFixed(2)
                                                }}</span
                                            >
                                            <p
                                                class="text-muted first-price"
                                                v-if="
                                                    parseFloat(
                                                        f.foodDiscount
                                                    ) != 0.0
                                                "
                                            >
                                                ${{
                                                    parseFloat(f.price).toFixed(
                                                        2
                                                    )
                                                }}
                                            </p>
                                        </div>

                                        <div class="item-qty col-sm-2 d-inline">
                                            <div>
                                                {{ `Quantity: ${f.quantity}` }}
                                            </div>
                                        </div>

                                        <div class="cal-total col-sm-2">
                                            <h4 class="item-total">
                                                ${{ calculateItemPrice(f) }}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="box-content row">
                            <RouterLink to="/menu/all" class="btn shop-btn"
                                ><i class="fa fa-arrow-left"></i>Continue
                                shopping</RouterLink
                            >
                            <button
                                class="btn check-out-btn"
                                style="margin-left: 10px"
                                :disabled="allFoods.length ? false : true"
                                @click="checkOutBtn()"
                            >
                                <i class="fa fa fa-shopping-cart"></i>Checkout
                            </button>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="box">
                            <div class="box-title">
                                <h3>Cart Summary</h3>
                            </div>

                            <div class="box-content">
                                <span>Summary</span>
                                <h3 class="font-bold total-first-price">
                                    ${{ calculateSummaryPrice()[0] }}
                                </h3>

                                <span>Discount</span>
                                <h3 class="font-bold total-discount">
                                    ${{ calculateSummaryPrice()[1] }}
                                </h3>

                                <span>Delivery fee</span>
                                <h3 class="font-bold total-delivery">
                                    ${{ calculateSummaryPrice()[2] }}
                                </h3>

                                <hr />

                                <span>Total</span>
                                <h2 class="font-bold total-sale">
                                    ${{ calculateSummaryPrice()[3] }}
                                </h2>

                                <div class="btn-group">
                                    <button
                                        class="btn check-out-btn"
                                        :disabled="
                                            allFoods.length ? false : true
                                        "
                                        @click="checkOutBtn()"
                                    >
                                        <i class="fa fa-shopping-cart"></i>
                                        Checkout
                                    </button>
                                    <button
                                        class="btn cancel-btn"
                                        :disabled="
                                            allFoods.length ? false : true
                                        "
                                        @click="deleteAll()"
                                    >
                                        Remove all
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="box">
                            <div class="box-title">
                                <h3>Support</h3>
                            </div>
                            <div class="box-content text-center">
                                <h3>
                                    <i class="fa fa-phone"></i> +84 123 123 123
                                </h3>
                                <span class="small">
                                    Please contact with us if you have any
                                    questions. We are avalible 24h.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TypeToast } from '@/enums/TypeToast';
import { notify } from '@/services/Toast';
import http from '@/services/http/http';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import VueBasicAlert from 'vue-basic-alert';

let allFoods = ref<any[]>([]);
const router = useRouter();
const store = useStore();
const authData = computed(() => store.getters['getAuthData']);

window.scrollTo(0, 0);

const getCartInfo = async () => {
    try {
        let { data } = (
            await http.get(
                `/Carts/getCartInfo?userId=${authData.value?.userId}`
            )
        ).data;
        allFoods.value = [...data];
    } catch (error) {
        notify('Lỗi lấy dữ liệu giỏ hàng', TypeToast.error);
    }
};

onMounted(() => {
    if (authData.value.userId) getCartInfo();
});

const calculateItemPrice = (item: any) => {
    return (
        (parseFloat(item.price) -
            (parseFloat(item.foodDiscount) * parseFloat(item.price)) / 100) *
        item.quantity
    )
        .toFixed(2)
        .toString();
};

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

    return [
        subtotal.toFixed(2),
        discount.toFixed(2),
        delivery.toFixed(2),
        total.toFixed(2),
    ];
};

const checkOutBtn = () => {
    router.push('/checkout');
};

const alert = ref();

const removeBtn = async (item: any) => {
    let isDeleteSuccess = false;
    try {
        let response = (await http.delete(`/Carts/deleteById/${item.cartId}`))
            .data;
        console.log(response.success);

        if (response.success) {
            alert.value.showAlert(
                'success',
                'Delete item of Cart Successfully!',
                'Successfully!'
            );
            isDeleteSuccess = true;
        }
    } catch (error) {
        notify('Lỗi xóa thành phần trong giỏ hàng', TypeToast.error);
        console.log(error);
    }
    if (isDeleteSuccess) await getCartInfo();
};

const deleteAll = async () => {
    let isDeleteSuccess = false;
    try {
        let response = (
            await http.post(
                `/Carts/removeAll`,
                JSON.stringify(authData.value?.userId)
            )
        ).data;
        if (response.success) {
            alert.value.showAlert(
                'success',
                'Delete all items of Cart Successfully!',
                'Successfully!'
            );
            isDeleteSuccess = true;
        }
    } catch (error) {
        notify('Lỗi xóa giỏ hàng', TypeToast.error);
        console.log(error);
    }
    if (isDeleteSuccess) await getCartInfo();
};
</script>

<style lang="scss" scoped>
@import url(./style.scss);
</style>
