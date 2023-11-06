<template>
    <BaseButton
        :type="ButtonType.success"
        className="btn_add"
        text="Add"
        @click="router.push({ path: '/admin/create-billDetails' })"
    />
    <BaseTable :headers="titleList" :items="items" entity="BillDetails" />
</template>

<script setup lang="ts">
import BaseTable from '@/components/BaseTable.vue';
import { ref } from 'vue';
import http from '@/services/http/http';
import { useStore } from 'vuex';
import BaseButton from '@/components/BaseButton.vue';
import { router } from '@/router';
import { ButtonType } from '@/enums/ButtonType';
import { SET_LOADING } from '@/stores/storeConstants';

const titleList = ['billId', 'foodId', 'quantity'];

const items = ref([]);
const store = useStore();
const getBills = async () => {
    try {
        store.dispatch(SET_LOADING, true);
        let { data } = (await http.get('/BillDetails/getAllRecord')).data;
        items.value = data;
    } catch (error) {
        store.dispatch(SET_LOADING, false);
    } finally {
        store.dispatch(SET_LOADING, false);
    }
};

getBills();
</script>

<style scoped lang="scss"></style>
