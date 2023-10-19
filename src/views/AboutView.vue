<template>
    <section class="about-section">
        <div class="heading">
            <span>about us</span>
            <h3>good quality dishes</h3>
        </div>

        <div class="row">
            <div class="about-content">
                <img src="../assets/images/demo/taco-chefcartoon.png" alt="" />
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
                <h3>food brings people together</h3>
            </div>
        </div>

        <div class="row gallery">
            <div class="wrapper">
                <img src="../assets/images/demo/taco-2.jpg" alt="" />
                <img src="../assets/images/demo/taco-4.jpg" alt="" />
                <img src="../assets/images/demo/burrito-6.jpg" alt="" />
                <img src="../assets/images/demo/burrito-2.jpg" alt="" />
                <img src="../assets/images/demo/burrito-3.jpg" alt="" />
                <img src="../assets/images/demo/nachos-1.jpg" alt="" />
                <img src="../assets/images/demo/nachos-2.jpg" alt="" />
                <img src="../assets/images/demo/nachos-3.jpg" alt="" />
                <img src="../assets/images/demo/dessert-2.jpg" alt="" />
                <img src="../assets/images/demo/dessert-6.jpg" alt="" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.about-section {
    padding: 2rem 9%;

    
    .about-content {
        display: flex;
        width: 100%;
        img {
            background-color: rgb(249, 249, 249);
        }

        .about-content-text {
            font-size: 16px;
            padding-left: 50px;
        }
    }

    .about-article {
        margin-top: 50px;
        padding: 10px;
        text-align: center;
        background-color: #27ae60;
        width: 100%;
        h3 {
            font-size: 32px;
            color: white;
        }
       
    }
    .gallery {
            overflow: hidden;
            padding: 100px;
            .wrapper {
                position: relative;
                flex-grow: 1;
                margin: auto;
                max-width: 1200px;
                max-height: 1200px;
                display: grid;
                grid-template-columns: repeat(8, 1fr);
                grid-template-rows: repeat(4, 1fr);
                grid-gap: 2vmin;
                justify-items: center;
                align-items: center;

                img {
                    z-index: 1;
                    grid-column: span 2;
                    max-width: 100%;
                    margin-bottom: -52%;
                    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
                    transform: scale(1);
                    transition: all 0.25s;

                    &:nth-child(7n + 1) {
                        grid-column: 2 / span 2;
                    }

                    &:hover {
                        z-index: 2;
                        transform: scale(2);
                    }
                }
            }
        }
}

@media (max-width: 768px) {
    .about-section .about-content img {
        width: 250px;
    }

    .about-section .gallery .wrapper img:hover {
        transform: scale(2.5);
    }
}

@media (max-width: 576px) {
    .about-section .about-content {
        display: block;

        img {
            width: inherit;
        }

        .about-content-text {
            padding-left: 0px;
        }
    }

    .about-section .gallery {
        padding: 50px 0px;
        .wrapper img {
            max-width: 100%;
        }
        .wrapper {
            grid-gap: 2vmin;
        }

        img:hover {
            transform: scale(2);
        }
    }
}
</style>
