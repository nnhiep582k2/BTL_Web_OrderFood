<template>
     <div class="order-details">
        <div class="order-details-inner">
            <h2 class="d-flex justify-content-between">Order summary
                <slot></slot>
            </h2>
            <div class="d-flex flex-wrap h-50 flex-row" style="overflow-y: auto;">
                <div style="flex: 50%;" v-for="(f, index) in filterFoods" :key="f?.food_id">
                    <div class="product-detail d-flex">
                        <div class="image">
                            <img :src="`../assets/images/${f?.food_src}`" alt="" />
                        </div>
                        <div class="content">
                            <p class="name">{{ f?.food_name }} <span>X {{ item_qty[index] }}</span></p>
                            <p class="desc">{{ f?.food_desc }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="price">
                <p>Discount: ${{ billMatch.bill_discount }}</p>
                <p>Delivery Fee: ${{ billMatch.bill_delivery }}</p>
                <p>Total: ${{ billMatch.bill_total }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';


interface IBillMatch {
    bill_discount: String,
    bill_delivery: String,
    bill_total: String
}

/**----------variable----------*/
const allFoodsInBill = reactive([])
const item_qty =  reactive([])
const billMatch = ref<IBillMatch>({
    bill_discount:'',
    bill_delivery:'',
    bill_total:''
})


/**----------computed----------*/
const filterFoods = computed(()=>{
    return new Array(3)
})
</script>

<style lang="scss" scoped>

</style>