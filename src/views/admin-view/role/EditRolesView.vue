<template>
    <div v-if="errors.length" class="row error-box">
        <ul>
            <li v-for="(error, index) in errors" :key="index">
                {{ error }}
            </li>
        </ul>
    </div>

    <div class="row">
        <div class="col-md-12">
            <BaseTextBox
                width="100%"
                label="RoleName"
                :inputType="InputType.text"
                v-model:model-value="models.roleName"
            />
        </div>
        <div class="col-md-12 mt-3">
            <button class="btn_add btn btn-success" @click="handleSubmit">
                Edit
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseTextBox from '@/components/BaseTextBox.vue';
import { useStore } from 'vuex';
import { onMounted, ref } from 'vue';
import { InputType } from '@/enums/TextBoxType';
import { SET_LOADING } from '@/stores/storeConstants';
import http from '@/services/http/http';
import { notify } from '@/services/Toast';
import { TypeToast } from '@/enums/TypeToast';
import { useRoute } from 'vue-router';
import router from '@/router';

interface IRoles {
    roleName: string;
}
const route = useRoute();
const store = useStore();
const models = ref<IRoles>({
    roleName: '',
});
const errors = ref<String[]>([]);
const rolesId = ref('');

onMounted(async () => {
    if (route.query.id) {
        rolesId.value = route.query.id.toString();
    }
    if (rolesId.value) {
        try {
            store.dispatch(SET_LOADING, true);
            let { data } = (
                await http.get(`/Roles/GetById?recordId=${rolesId.value}`)
            ).data;
            models.value = {
                roleName: data?.roleName,
            };
            store.dispatch(SET_LOADING, false);
        } catch (error) {
            store.dispatch(SET_LOADING, false);
        } finally {
            store.dispatch(SET_LOADING, false);
        }
    }
});

const handleSubmit = async () => {
    try {
        if (!models.value.roleName) {
            if (!errors.value.find((el) => el === 'RoleName is required')) {
                errors.value.push('RoleName is required');
            }
        } else {
            if (errors.value.find((el) => el === 'RoleName is required')) {
                const indexuserRoleName = errors.value.findIndex(
                    (el) => el === 'RoleName is required'
                );
                errors.value.splice(indexuserRoleName, 1);
            }
        }

        if (errors.value.length == 0) {
            const payload = {
                roleId: rolesId.value,
                roleName: models.value.roleName,
            };
            store.dispatch(SET_LOADING, true);
            const { data } = await http.put(
                'Roles/updateRecord',
                JSON.stringify(payload)
            );
            if (data.success) {
                notify('Edit success!', TypeToast.success);
                router.push({ path: `/admin/roles` });
            }
            store.dispatch(SET_LOADING, false);
        }
    } catch (error) {
        console.log(error);
        notify('Edit fail!', TypeToast.error);
        store.dispatch(SET_LOADING, false);
    }
};
</script>

<style scoped lang="scss">
.error-box {
    background-color: #fff9fa;
    box-sizing: border-box;
    border: 2px solid rgba(255, 66, 79, 0.2);
    border-radius: 2px;
    font-size: 12px;
    margin-bottom: 20px;
    ul {
        list-style-type: none;
        margin: 0;
        padding: 10px 0px;
        li {
            padding-left: 10px;
            color: rgb(182, 0, 0);
            font-size: 20px;
        }
    }
}

label {
    font-size: 20px;
}
</style>
