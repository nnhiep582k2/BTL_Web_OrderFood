<template>
    <div class="promotions p-x-80">
        <div class="heading">
            <span class="promotions-title">Promotions</span>
            <h3>Best quality with reasonable price</h3>
        </div>

        <!-- DB chưa đáp ứng, nếu bổ sung thì rất mất thời gian -->
        <!-- <div class="promotions-item">
            <div class="table-responsive">
                <table class="table table-bordered text-center">
                    <thead>
                        <tr class="bg-light-gray">
                            <th class="text-uppercase">Time</th>
                            <th class="text-uppercase">Monday</th>
                            <th class="text-uppercase">Tuesday</th>
                            <th class="text-uppercase">Wednesday</th>
                            <th class="text-uppercase">Thursday</th>
                            <th class="text-uppercase">Friday</th>
                            <th class="text-uppercase">Saturday</th>
                            <th class="text-uppercase">Sunday</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="align-middle">07:00 - 09:00</td>
                            <td>
                                <span class="bg-brown activity-name"
                                    >Breakfast time</span
                                >
                                <div class="activity-time">Discount 10%</div>
                            </td>
                            <td>
                                <span class="bg-brown activity-name"
                                    >Breakfast time</span
                                >
                                <div class="activity-time">Discount 10%</div>
                            </td>

                            <td>
                                <span class="bg-brown activity-name"
                                    >Breakfast time</span
                                >
                                <div class="activity-time">Discount 10%</div>
                            </td>
                            <td>
                                <span class="bg-brown activity-name"
                                    >Breakfast time</span
                                >
                                <div class="activity-time">Discount 10%</div>
                            </td>
                            <td>
                                <span class="bg-brown activity-name"
                                    >Breakfast time</span
                                >
                                <div class="activity-time">Discount 10%</div>
                            </td>
                            <td class="bg-light-gray"></td>
                            <td class="bg-light-gray"></td>
                        </tr>

                        <tr>
                            <td class="align-middle">10:00 - 14:00</td>
                            <td>
                                <span class="bg-beige activity-name"
                                    >Happy Lunch</span
                                >
                                <div class="activity-time">Free Drink</div>
                            </td>
                            <td class="bg-light-gray"></td>
                            <td>
                                <span class="bg-beige activity-name"
                                    >Happy Lunch</span
                                >
                                <div class="activity-time">Free Drink</div>
                            </td>
                            <td class="bg-light-gray"></td>
                            <td>
                                <span class="bg-beige activity-name"
                                    >Happy Lunch</span
                                >
                                <div class="activity-time">Free Drink</div>
                            </td>
                            <td class="bg-light-gray"></td>
                            <td class="bg-light-gray"></td>
                        </tr>

                        <tr>
                            <td class="align-middle">15:00 - 17:00</td>
                            <td class="bg-light-gray"></td>
                            <td>
                                <span class="bg-earth activity-name"
                                    >Afternoon Snack</span
                                >
                                <div class="activity-time">
                                    Discount 20% Nachos & Dessert
                                </div>
                            </td>
                            <td class="bg-light-gray"></td>
                            <td>
                                <span class="bg-earth activity-name"
                                    >Afternoon Snack</span
                                >
                                <div class="activity-time">
                                    Discount 20% Nachos & Dessert
                                </div>
                            </td>
                            <td class="bg-light-gray"></td>
                            <td class="bg-light-gray"></td>
                            <td class="bg-light-gray"></td>
                        </tr>

                        <tr>
                            <td class="align-middle">18:00 - 20:00</td>
                            <td class="bg-light-gray"></td>
                            <td class="bg-light-gray"></td>
                            <td class="bg-light-gray"></td>
                            <td class="bg-light-gray"></td>
                            <td>
                                <span class="bg-green activity-name"
                                    >Happy Dinner</span
                                >
                                <div class="activity-time">Discount 15%</div>
                            </td>
                            <td>
                                <span class="bg-green activity-name"
                                    >Happy Dinner</span
                                >
                                <div class="activity-time">Discount 15%</div>
                            </td>
                            <td>
                                <span class="bg-green activity-name"
                                    >Happy Dinner</span
                                >
                                <div class="activity-time">Discount 15%</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div> -->

        <BasePromotion
            class="m-b-10"
            v-for="(item, index) in dataDiscount"
            :src="item.url"
            :key="index"
            :title="getDiscountType(item)"
            :datas="item.foodDesc?.split(';')"
            @onClick="handleClickButton"
        />
    </div>
</template>

<script setup lang="ts">
import BasePromotion from '@/components/BasePromotion.vue';
import { TypeToast } from '@/enums/TypeToast';
import { notify } from '@/services/Toast';
import http from '@/services/http/http';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

window.scrollTo(0, 0);

document.title = 'Promotions | Orod - Order Food';

const handleClickButton = () => {
    router.push({
        path: 'menu/all',
    });
};

const dataDiscount = ref<any[]>([]);

const getDataDiscount = async () => {
    try {
        let res = (await http.get('/Foods/getTopDiscount/5')).data;
        if (res.success) {
            dataDiscount.value = res.datas;
        }
    } catch (error: any) {
        notify('Lỗi lấy dữ liệu giảm giá', TypeToast.error);
    }
};

onMounted(() => {
    getDataDiscount();
});

const getDiscountType = (item: any) => {
    if (item.foodDiscountType === 1)
        return `Special Offer Upto ${item.foodDiscount}%`;
    return `Limited Offer Upto ${item.foodDiscount}%`;
};
</script>

<style lang="scss" scoped>
@import url(./style.scss);
</style>
