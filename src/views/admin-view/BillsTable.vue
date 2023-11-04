<template>
     <BaseTable :headers="titleList" :items="items"> </BaseTable>
</template>

<script setup lang="ts">

import BaseTable from "@/components/BaseTable.vue";
import { ref } from "vue";
import http from "@/services/http/http";
import { useStore } from "vuex";
import { SET_LOADING } from "@/stores/storeConstants";

const titleList = [
    "billId",
    "userId",
    "pain",
    "status",
    "total",
    "address",
    "phoneNumber",
    "method",
    "discount",
    "delivery",
    "createdDate",
    "createdBy",
    "modifiedDate",
    "modifiedBy"
];

const items = ref([]);
const store = useStore();
const getBills = async () => {
    try {
        store.dispatch(SET_LOADING, true);
        let { data } = (await http.get("/Bills/getBills")).data;
        items.value = data;
    } catch (error) {
        store.dispatch(SET_LOADING, false);
    } finally {
        store.dispatch(SET_LOADING, false);
    }
};

getBills();
</script>

<style scoped lang="scss">

</style>