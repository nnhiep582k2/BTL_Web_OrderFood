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
                    <img :src="`../assets/images/${f?.food_src}`" alt="" />
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
                        @click="addToCart"
                        text="Add to cart"
                        type="success"
                    ></BaseButton>
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
                <router-link
                    class="btn"
                    to="/login"
                    style="padding: 28px; font-size: 24px"
                    >login now
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import { computed, ref } from "vue";
import VueBasicAlert from "vue-basic-alert";

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

/**----------variable----------*/
const qty = ref<Number>(1);
const user = ref("5345");

/**----------computed----------*/
const selectedFood = computed<IFood[]>(() => {
    return [
        {
            food_name: "345345",
            food_src: "",
            food_desc: "",
            food_price: "",
            food_discount: "",
        },
    ];
});

/**----------methods----------*/
const onQtyChange = (e: Event) => {};

const addToCart = async () => {};
</script>

<style lang="scss" scoped>
.quick-view {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;

    .quick-view-inner {
        width: 45vw;
        height: 45vh;
        background-color: #fff;
        padding: 32px;
        h2 {
            margin: 0;
            font-size: 32px;
            color: #27ae60;
        }

        .product-detail {
            .image img {
                height: 20rem;
                margin: 20px;
            }

            .content {
                margin-top: 20px;
                font-size: 20px;
                width: 100%;

                p span {
                    margin-left: 5px;
                    text-decoration: line-through;
                    opacity: 0.5;
                }

                div label {
                    margin-right: 10px;
                }

                .btn {
                    margin-top: 20px;
                    float: right;
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .quick-view .quick-view-inner {
        width: 50vw;
        height: 40vh;

        h2 {
            font-size: 20px;
        }

        .btn {
            font-size: 10px;
            padding: 0.3rem 0.9rem;
        }

        .product-detail {
            .image img {
                height: 12rem;
                margin: 30px;
                margin-left: 0px;
            }

            .content .desc {
                font-size: 12px;
            }

            .content .qty {
                font-size: 12px;
            }
        }
    }

    .link-to-login {
        margin-top: 20px !important;
    }
}

@media (max-width: 576px) {
    .quick-view .quick-view-inner {
        width: 90vw;
        height: 40vh;
    }

    .link-to-login {
        margin-top: 50px !important;
    }

    .link-to-login > a {
        padding: 20px !important;
        font-size: 18px !important;
    }
}
</style>
