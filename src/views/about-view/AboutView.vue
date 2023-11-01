<template>
    <section class="about-section p-x-80">
        <div class="heading">
            <span class="about-title">About Us</span>
            <h3>Good Quality Dishes</h3>
        </div>

        <div class="row">
            <div class="about-content">
                <img
                    src="/src/assets/images/template/taco-chefcartoon.png"
                    alt=""
                />
                <div class="about-content-text">
                    <p>
                        Our restaurant QFood was founded by Quang (a 5 Michelin
                        stars chef) in 2002 in Vietnam. After that, thanks to
                        the support of our customers, our brand has been
                        popularized globally in markets such as Australia, USA,
                        Canada, UK, France, Germany, Belgium, Russia, China,
                        Japan, Singapore, ... Mexican-style meals, the products
                        that we deliver to customers are always the best quality
                        products.
                    </p>
                    <p>
                        Customers can eat at the restaurant to experience the
                        Mexican atmosphere or can order food to be delivered to
                        their homes.
                    </p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="about-article">
                <h3>Food brings people together</h3>
            </div>
        </div>

        <div class="row gallery">
            <div class="wrapper">
                <img
                    v-for="(image, index) in GalleryData"
                    :key="index"
                    :src="image"
                    alt=""
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { GalleryData } from '@/mocks/ListGallery';

window.scrollTo(0, 0);

document.title = 'About | Orod - Order Food';
</script>

<style lang="scss" scoped>
@import url(./style.scss);
</style>
