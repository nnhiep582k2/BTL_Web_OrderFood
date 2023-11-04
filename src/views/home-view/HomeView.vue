<template>
    <div class="home-view">
        <div class="home-main">
            <div class="content">
                <span>Welcome Foodies</span>
                <h3>Original taste from Mexico 😋</h3>
                <p>
                    We guarantee to use fresh food with the best quality.
                    Customers will enjoy Mexican cuisine with explosive,
                    sophisticated flavors.
                </p>
                <RouterLink to="/menu/all" class="btn" @click="scrollToTop()">
                    <BaseButton text="Order Now" :type="ButtonType.success" />
                </RouterLink>
            </div>
            <div class="image">
                <img
                    src="/src/assets/images/template/b.png"
                    alt=""
                    class="home-img"
                />
                <img
                    src="/src/assets/images/template/a.png"
                    alt=""
                    class="home-parallax-img"
                />
            </div>
        </div>

        <div class="home-category">
            <RouterLink
                v-for="(item, index) in dataHomeCategory"
                class="box"
                :to="`/menu/${item.name}`"
                :key="index"
                @click="scrollToTop()"
            >
                <img :src="item.src" alt="" />
                <h3>{{ item.name }}</h3>
            </RouterLink>
        </div>

        <div class="home-banner d-flex">
            <BaseAds
                v-for="(item, index) in DataBaseAds"
                :src="item.src"
                :key="index"
                width="33%"
            >
                <template #content>
                    <div class="title">{{ item.title }}</div>
                    <div class="discount">{{ item.discount }}</div>
                    <RouterLink to="/menu/all">
                        <BaseButton
                            :type="item.button.type"
                            :text="item.button.text"
                        />
                    </RouterLink>
                </template>
            </BaseAds>
        </div>

        <div class="home-about">
            <div class="image">
                <img src="/src/assets/images/template/about-img.jpg" alt="" />
            </div>
            <div class="content">
                <span>Why Choose Us?</span>
                <h3 class="title">What's make our food delicious!</h3>
                <p>
                    Food to customers is always guaranteed of the best quality.
                    Our dishes are made by chef Quang (a 5 Michelin stars chef),
                    promising to bring explosive, delicate, impressive flavors.
                    Our delivery service is very professional, customers can
                    enjoy the same quality at the restaurant
                </p>
                <RouterLink @click="scrollToTop()" to="/about" class="btn">
                    <BaseButton text="Read More" :type="ButtonType.success"
                /></RouterLink>
                <div class="icons-container">
                    <div
                        class="icons"
                        v-for="(item, index) in ServicesData"
                        :key="index"
                    >
                        <img :src="item.src" alt="" />
                        <h3>{{ item.text }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ButtonType } from '@/enums/ButtonType';
import { DataBaseAds } from '@/mocks/BaseAds';
import BaseButton from '@/components/BaseButton.vue';
import BaseAds from '@/components/BaseAds.vue';
import { ServicesData } from '@/mocks/HomeServices';
import http from '@/services/http/http';
import { onMounted, ref } from 'vue';

const scrollToTop = () => {
    window.scrollTo(0, 0);
};

scrollToTop();

document.title = 'Home | Orod - Order Food';

const dataHomeCategory = ref<any[]>([]);

onMounted(async () => {
    dataHomeCategory.value = (
        await http.get('/Categories/GetAllRecord')
    ).data?.data;
});
</script>

<style scoped lang="scss">
@import url(./style.scss);
</style>
