<template>
    <div class="content">
        <slot />
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.content {
    margin: 60px 0 0;
    overflow-x: hidden;
    min-height: calc(100vh - 60px - 100px);
}
</style>
