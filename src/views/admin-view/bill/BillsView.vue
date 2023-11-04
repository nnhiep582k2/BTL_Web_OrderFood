<template>
    <BaseButton
        :type="ButtonType.success"
        className="btn_add"
        text="Add"
        @click="router.push({ path: '/admin/create-bills' })"
    />
    <BaseTable :headers="titleList" :items="items" entity="Bills" />
</template>

<script setup lang="ts">
import BaseTable from "@/components/BaseTable.vue";
import { ref } from "vue";
import http from "@/services/http/http";
import { useStore } from "vuex";
import BaseButton from "@/components/BaseButton.vue";
import { router } from "@/router";
import { ButtonType } from "@/enums/ButtonType";
import { SET_LOADING } from "@/stores/storeConstants";
import { StatusBill } from "@/enums/StatusBill";

const titleList = [
    "billId",
    "userId",
    "paid",
    "status",
    "total",
    "method",
    "discount",
    "delivery",
    "createdDate",
    "createdBy",
    "modifiedDate",
    "modifiedBy",
];

const items = ref([]);
const store = useStore();
const getBills = async () => {
    try {
        store.dispatch(SET_LOADING, true);
        let { data } = (await http.get("/Bills/getBills")).data;
        items.value = data.map((el) => {
            if (el?.status) {
                switch (el?.status) {
                    case StatusBill.cancel:
                        el.status =  "Cancel";
                        break;
                    case StatusBill.confirmed:
                        el.status =  "Confirmed";
                        break;
                    case StatusBill.preparing:
                        el.status =  "Preparing";
                        break;
                    case StatusBill.checking:
                        el.status =  "Checking";
                        break;
                    case StatusBill.delivering:
                        el.status =  "Delivering";
                        break;
                    case StatusBill.delivered:
                        el.status =  "Delivered";
                        break;
                    default:
                        break;
                }
                return el
            }
        });
    } catch (error) {
        store.dispatch(SET_LOADING, false);
    } finally {
        store.dispatch(SET_LOADING, false);
    }
};

getBills();
</script>

<style scoped lang="scss"></style>
