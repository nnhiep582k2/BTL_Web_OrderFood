<template>
    <div class="content">
        <slot />
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.content {
    margin: 60px 0 0;
    padding: 20px 80px;
    min-height: calc(100vh - 56px - 56px);
}
</style>
