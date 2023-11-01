<template>
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
                                        {{ filterFoods.length.toString() }}
                                        <span v-if="filterFoods.length < 2"
                                            >item</span
                                        >
                                        <span v-else>items</span>
                                    </p>
                                    In your cart
                                </h3>
                            </div>

                            <div v-if="!filterFoods.length">
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
                                    v-for="(f, index) in filterFoods as any"
                                    :key="index"
                                >
                                    <div class="box-content row">
                                        <div
                                            class="image-box col-sm-3"
                                            style="padding-left: 0"
                                        >
                                            <img
                                                :src="`/src/assets/images/template/${f.food_src}`"
                                                alt=""
                                                class="cart-product-img"
                                            />
                                        </div>

                                        <div class="desc col-sm-4">
                                            <h2 class="item-name">
                                                {{ f.food_name }}
                                            </h2>
                                            <div class="item-desc">
                                                <b>Description</b>
                                                <p>{{ f.food_desc }}</p>
                                            </div>
                                            <button
                                                class="btn remove-btn"
                                                @click="removeBtn(index)"
                                            >
                                                <i class="fa fa-trash"></i
                                                >Remove item
                                            </button>
                                        </div>

                                        <div class="item-price col-sm-1">
                                            <span class="sale-price"
                                                >${{
                                                    parseFloat(f.food_price) -
                                                    parseFloat(f.food_discount)
                                                }}</span
                                            >
                                            <p
                                                class="text-muted first-price"
                                                v-if="
                                                    parseFloat(
                                                        f.food_discount
                                                    ) != 0.0
                                                "
                                            >
                                                ${{ parseFloat(f.food_price) }}
                                            </p>
                                        </div>

                                        <div class="item-qty col-sm-2 d-inline">
                                            <label
                                                for="iQuantity"
                                                style="
                                                    font-size: 12px;
                                                    padding-right: 2px;
                                                "
                                                >Quantity:</label
                                            >
                                            <input
                                                type="number"
                                                id="iQuantity"
                                                class="form-control item-quantity"
                                                :value="itemQuantity[index]"
                                                min="1"
                                                max="1000"
                                                @change="
                                                    onQtyChange($event, index)
                                                "
                                            />
                                        </div>

                                        <div class="cal-total col-sm-2">
                                            <h4 class="item-total">
                                                ${{ calculateItemPrice(index) }}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="box-content row">
                            <RouterLink to="/menu" class="btn shop-btn"
                                ><i class="fa fa-arrow-left"></i>Continue
                                shopping</RouterLink
                            >
                            <button
                                class="btn check-out-btn"
                                style="margin-left: 10px"
                                :disabled="filterFoods.length ? false : true"
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
                                            filterFoods.length ? false : true
                                        "
                                        @click="checkOutBtn()"
                                    >
                                        <i class="fa fa-shopping-cart"></i>
                                        Checkout
                                    </button>
                                    <button
                                        class="btn cancel-btn"
                                        :disabled="
                                            filterFoods.length ? false : true
                                        "
                                        @click="cancelBtn()"
                                    >
                                        Cancel
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
import { useRouter } from 'vue-router';

let cartItem: any[] = [];
let itemQuantity: any[] = [];
let allFoods: any[] = [];
let user: any = {};
const router = useRouter();

const matchID = (food, cartArray) => {
    let temp = '';
    cartArray.forEach((element) => {
        if (parseInt(food.food_id) == element) {
            temp = food;
        }
    });
    return temp;
};

const calculateItemPrice = (index) => {
    return (
        (parseInt(filterFoods[index].food_price) -
            parseInt(filterFoods[index].food_discount)) *
        itemQuantity[index]
    ).toString();
};

const calculateSummaryPrice = () => {
    let subtotal = 0;
    let discount = 0;
    let delivery = 15;
    let i = 0;
    while (i < itemQuantity.length) {
        subtotal =
            subtotal + parseInt(filterFoods[i].food_price) * itemQuantity[i];
        discount =
            discount + parseInt(filterFoods[i].food_discount) * itemQuantity[i];
        i = i + 1;
    }
    if (!filterFoods.length) {
        delivery = 0;
    }
    let total = subtotal - discount + delivery;
    return [subtotal, discount, delivery, total];
};

const onQtyChange = async (e, i) => {
    if (e.target.value < 1) {
        e.target.value = 1;
        itemQuantity[i] = 1;
    } else {
        itemQuantity[i] = e.target.value;
    }

    let data = {
        user_id: parseInt(user.user_id),
        food_id: parseInt(cartItem[i]),
        item_qty: itemQuantity[i],
    };
    // await axios.put('/cartItem/', data);
};

const cancelBtn = async () => {
    // await axios.delete('/cartItem/' + user.user_id);
    cartItem = [];
    itemQuantity = [];
};

const checkOutBtn = () => {
    router.push('/checkout');
};

const filterFoods = (): any[] => {
    return allFoods.filter((f) => matchID(f, cartItem));
};

const removeBtn = async (index) => {
    // await axios.delete('/cartItem/' + user.user_id + '/' + cartItem[index]);
    cartItem.splice(index, 1);
    itemQuantity.splice(index, 1);
};

const getAllCartItem = async () => {
    if (user) {
        // let existItem = await axios.get('/cartItem/' + user.user_id);
        // existItem.data.forEach((element: any) => {
        //     cartItem.push(element);
        //     itemQuantity.push(element.item_qty);
        // });
    }
};

getAllCartItem();
</script>

<style lang="scss" scoped>
@import url(./style.scss);
</style>
