<template>
    <BaseButton
        :type="ButtonType.success"
        className="btn_add"
        text="Add"
        @click="router.push({ path: '/admin/create-paymentOrders' })"
    />
    <BaseTable :headers="titleList" :items="items" entity="PaymentOrders" />
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import { ButtonType } from '@/enums/ButtonType';
import BaseTable from '@/components/BaseTable.vue';
import { SET_LOADING } from '@/stores/storeConstants';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import http from '@/services/http/http';

const router = useRouter();

const titleList = ['paymentId', 'orderId', 'createdDate'];

const items = ref([]);
const store = useStore();
const getCarts = async () => {
    try {
        store.dispatch(SET_LOADING, true);
        let { data } = (await http.get('/PaymentOrders/GetAllRecord')).data;
        items.value = data;
    } catch (error) {
        store.dispatch(SET_LOADING, false);
    } finally {
        store.dispatch(SET_LOADING, false);
    }
};

getCarts();
</script>

<style scoped lang="scss"></style>
