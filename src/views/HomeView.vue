<template>
    <h2>DEMO CONTROL - nnhiep</h2>
    <base-button :type="ButtonType.warning" text="Order Now" />
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import { ButtonType } from '@/enums/ButtonType';
</script>

<style lang="scss" scoped></style>
