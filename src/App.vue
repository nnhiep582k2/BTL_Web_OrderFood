<template>
    <HeaderLayout />
    <ContentLayout>
        <RouterView />
    </ContentLayout>
    <FooterLayout />

    <BaseLoading v-if="isLoading" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {useStore} from 'vuex';
import HeaderLayout from './layouts/HeaderLayout.vue';
import FooterLayout from './layouts/FooterLayout.vue';
import ContentLayout from './layouts/ContentLayout.vue';
import BaseLoading from './components/BaseLoading.vue';



const store = useStore()
const isLoading = computed(() => store.state.isLoading)
</script>

<style lang="scss" scoped></style>
