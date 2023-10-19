<template>
    <div>
        <div class="box">
            <div class="content">
                <h1>No match found!</h1>
            </div>
            <div class="image">
                <img src="/src/assets/images/demo/notfound.png" alt="no data" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.box {
    border-radius: 0.5rem;
    position: relative;
    background: #f7f7f7;
    padding: 2rem;
    text-align: center;
    user-select: none;
    h1 {
        color: var(--color-primary-bolder);
        font-size: 2.5rem;
    }
    .image {
        margin: 1rem 0;
        img {
            height: 15rem;
        }
    }
}
</style>
