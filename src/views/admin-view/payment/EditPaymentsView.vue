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
                label="PaymentId"
                :inputType="InputType.text"
                v-model:model-value="models.paymentId"
            />
        </div>
        <div class="col-md-12">
            <BaseTextBox
                width="100%"
                label="Type"
                :inputType="InputType.text"
                v-model:model-value="models.type"
            />
        </div>
        <div class="col-md-12 mt-3">
            <button class="btn_add btn btn-success" @click="handleSubmit">
                Add
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

interface ICarts {
    paymentId: string;
    type: string;
}
const route = useRoute();
const store = useStore();
const models = ref<ICarts>({
    paymentId: '',
    type: '',
});
const errors = ref<String[]>([]);
const paymentId = ref('');

onMounted(async () => {
    if (route.query.id) {
        paymentId.value = route.query.id.toString();
    }
    if (paymentId.value) {
        try {
            store.dispatch(SET_LOADING, true);
            let { data } = (
                await http.get(`/Payments/GetById?recordId=${paymentId.value}`)
            ).data;
            models.value = {
                paymentId: data.paymentId,
                type: data.type,
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
        if (!models.value.paymentId) {
            if (!errors.value.find((el) => el === 'PaymentId is required')) {
                errors.value.push('PaymentId is required');
            }
        } else {
            if (errors.value.find((el) => el === 'PaymentId is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'PaymentId is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }

        if (!models.value.type) {
            if (!errors.value.find((el) => el === 'Type is required')) {
                errors.value.push('Type is required');
            }
        } else {
            if (errors.value.find((el) => el === 'Type is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'Type is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }

        if (errors.value.length == 0) {
            const payload = {
                paymentId: models.value.paymentId,
                type: models.value.type,
            };
            store.dispatch(SET_LOADING, true);
            const { data } = await http.post(
                '/Payments/updateRecord',
                JSON.stringify(payload)
            );
            if (data.success) {
                notify('Edit success!', TypeToast.success);
                router.push({ path: `/admin/payments` });
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
