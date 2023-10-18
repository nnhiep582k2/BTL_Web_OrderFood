<template>
    <div class="content">
        <slot />
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.content {
    margin: 56px 0;
    padding: 16px;
    min-height: calc(100vh - 56px - 56px);
}
</style>
