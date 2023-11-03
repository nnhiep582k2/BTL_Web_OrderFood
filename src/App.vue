<template>
    <HeaderLayout />
    <ContentLayout>
        <RouterView />
    </ContentLayout>
    <FooterLayout />
    <BaseLoading v-if="isLoading" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import HeaderLayout from "./layouts/HeaderLayout.vue";
import FooterLayout from "./layouts/FooterLayout.vue";
import ContentLayout from "./layouts/ContentLayout.vue";
import BaseLoading from "./components/BaseLoading.vue";
import { FOOD_ACTION, SET_LOADING } from "./stores/storeConstants";
import { notify } from "./services/Toast";
import { TypeToast } from "./enums/TypeToast";

                        

const store = useStore();

const isLoading = computed(() => store.state.isLoading);

const handleGetFood = async () => {
    try {
        store.dispatch(SET_LOADING, true);
        await store.dispatch(`${FOOD_ACTION}`);
    } catch (error: any) {
        store.dispatch(SET_LOADING, false);
        notify(`${error.message}`, TypeToast.error);
    } finally {
        store.dispatch(SET_LOADING, false);
    }
};

handleGetFood();
</script>

<style lang="scss" scoped></style>
