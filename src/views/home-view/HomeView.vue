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
                <router-link to="/menu" class="btn" @click="scrollToTop()">
                    <BaseButton text="Order Now" :type="ButtonType.success" />
                </router-link>
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
            <router-link
                v-for="(item, index) in DataHomeCategory"
                to="/menu"
                class="box"
                :key="index"
                @click="scrollToTop()"
            >
                <img :src="item.src" alt="" />
                <h3>{{ item.name }}</h3>
            </router-link>
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
                    <base-button
                        :type="item.button.type"
                        :text="item.button.text"
                    />
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
                <router-link @click="scrollToTop()" to="/about" class="btn">
                    <BaseButton text="Read More" :type="ButtonType.success"
                /></router-link>
                <div class="icons-container">
                    <div class="icons">
                        <img
                            src="/src/assets/images/template/serv-1.png"
                            alt=""
                        />
                        <h3>Fast Delivery</h3>
                    </div>
                    <div class="icons">
                        <img
                            src="/src/assets/images/template/serv-2.png"
                            alt=""
                        />
                        <h3>Fresh Food</h3>
                    </div>
                    <div class="icons">
                        <img
                            src="/src/assets/images/template/serv-3.png"
                            alt=""
                        />
                        <h3>Best Quality</h3>
                    </div>
                    <div class="icons">
                        <img
                            src="/src/assets/images/template/serv-4.png"
                            alt=""
                        />
                        <h3>24/7 Support</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ButtonType } from '@/enums/ButtonType';
import { DataBaseAds } from '@/mocks/BaseAds';
import BaseButton from '@/components/BaseButton.vue';
import BaseAds from '@/components/BaseAds.vue';
import { DataHomeCategory } from '@/mocks/HomeCategory';

const scrollToTop = () => {
    window.scrollTo(0, 0);
};
</script>

<style scoped lang="scss">
@import url(./style.scss);
</style>
