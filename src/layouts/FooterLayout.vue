<template>
    <div class="footer">Footer</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.footer {
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 56px;
    color: white;
    background-color: var(--color-primary);
}
</style>
