<template>
    <BaseButton
        :type="ButtonType.success"
        className="btn_add"
        text="Add"
        @click="router.push({ path: '/admin/create-orders' })"
    />
    <BaseTable :headers="titleList" :items="items" entity="Orders">
    </BaseTable>
</template>

<script setup lang="ts">
import BaseTable from "@/components/BaseTable.vue";
import { ref } from "vue";
import http from "@/services/http/http";
import BaseButton from "@/components/BaseButton.vue";
import { useStore } from "vuex";
import { SET_LOADING } from "@/stores/storeConstants";
import { ButtonType } from "@/enums/ButtonType";
import router from "@/router";


const titleList = [
    "orderId",
    "userId",
    "pickupDate",
    "createdDate",
    "createdBy",
    "modifiedDate",
    "modifiedBy",
];

const items = ref([]);
const store = useStore();
const getOrders = async () => {
    try {
        store.dispatch(SET_LOADING, true);
        let { data } = (await http.get("/orders/GetAllRecord")).data;
        items.value = data;
    } catch (error) {
        store.dispatch(SET_LOADING, false);
    } finally {
        store.dispatch(SET_LOADING, false);
    }
};

getOrders();
</script>

<style scoped>

</style>