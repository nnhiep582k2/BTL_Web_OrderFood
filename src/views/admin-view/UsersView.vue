<template>
    <BaseButton
        :type="ButtonType.success"
        className="btn_add"
        text="Add"
        @click="router.push({ path: '/admin/create-bills' })"
    />
    <BaseTable :headers="titleList" :items="items" entity="Auth" />
</template>

<script setup lang="ts">
import BaseTable from '@/components/BaseTable.vue';
import { ref } from 'vue';
import http from '@/services/http/http';
import { useStore } from 'vuex';
import { SET_LOADING } from '@/stores/storeConstants';
import { Gender } from '@/enums/Gender';
import { ButtonType } from '@/enums/ButtonType';
import BaseButton from '@/components/BaseButton.vue';
import router from '@/router';

const titleList = [
    'userId',
    'username',
    'email',
    'phoneNumber',
    'address',
    'avatar',
    'gender',
    'roleId',
    'createdDate',
    'createdBy',
    'modifiedDate',
    'modifiedBy',
];

const items = ref([]);
const store = useStore();

const getUsers = async () => {
    try {
        store.dispatch(SET_LOADING, true);
        let { data } = (await http.get('/Auth/GetAllRecord')).data;
        items.value = data.map((el) => {
            if (el.gender) {
                el.gender =
                    el.gender === Gender.male
                        ? 'Male'
                        : el.gender === Gender.female
                        ? 'Female'
                        : 'Other';
            }
            return el;
        });
    } catch (error) {
        store.dispatch(SET_LOADING, false);
    } finally {
        store.dispatch(SET_LOADING, false);
    }
};

getUsers();
</script>

<style scoped lang="scss"></style>
