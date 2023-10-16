<template>
    <HeaderLayout />
    <ContentLayout>
        <RouterView />
    </ContentLayout>
    <FooterLayout />
</template>

<script setup lang="ts">
import HeaderLayout from './layouts/HeaderLayout.vue';
import FooterLayout from './layouts/FooterLayout.vue';
import ContentLayout from './layouts/ContentLayout.vue';
</script>

<style lang="scss" scoped></style>
