<template>
    <div v-if="errors.length" class="row error-box">
        <ul>
            <li v-for="(error, index) in errors" :key="index">
                {{ error }}
            </li>
        </ul>
    </div>
    <div class="col-md-12">
        <BaseTextBox
            width="100%"
            label="BillId"
            :inputType="InputType.text"
            v-model:model-value="models.billId"
        />
    </div>
    <div class="col-md-12">
        <BaseTextBox
            width="100%"
            label="FoodId"
            :inputType="InputType.text"
            v-model:model-value="models.foodId"
        />
    </div>
    <div class="col-md-12">
        <BaseTextBox
            width="100%"
            label="Quantity"
            :inputType="InputType.number"
            v-model:model-value="models.quantity"
        />
    </div>
    <div class="col-md-12 mt-3">
        <button class="btn_add btn btn-success" @click="handleSubmit">
            Add
        </button>
    </div>
</template>

<script setup lang="ts">
import BaseTextBox from '@/components/BaseTextBox.vue';
import { InputType } from '@/enums/TextBoxType';
import { ref } from 'vue';
import http from '@/services/http/http';
import { useStore } from 'vuex';
import { SET_LOADING } from '@/stores/storeConstants';
import { notify } from '@/services/Toast';
import { TypeToast } from '@/enums/TypeToast';

interface IBillDetail {
    billId: string;
    foodId: string;
    quantity: string;
}
const store = useStore();
const models = ref<IBillDetail>({
    billId: '',
    foodId: '',
    quantity: '',
});
const errors = ref<String[]>([]);

const handleSubmit = async () => {
    try {
        if (!models.value.billId) {
            if (!errors.value.find((el) => el === 'BillId is required')) {
                errors.value.push('BillId is required');
            }
        } else {
            if (errors.value.find((el) => el === 'BillId is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'BillId is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }

        if (!models.value.foodId) {
            if (!errors.value.find((el) => el === 'FoodId is required')) {
                errors.value.push('FoodId is required');
            }
        } else {
            if (errors.value.find((el) => el === 'FoodId is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'FoodId is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }

        if (!models.value.quantity) {
            if (!errors.value.find((el) => el === 'Quantity is required')) {
                errors.value.push('Quantity is required');
            }
        } else {
            if (errors.value.find((el) => el === 'Quantity is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'Quantity is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }
        if (errors.value.length == 0) {
            const payload = {
                billId: models.value.billId,
                foodId: models.value.foodId,
                quantity: models.value.quantity,
            };
            store.dispatch(SET_LOADING, true);
            const { data } = await http.post(
                '/BillDetails/addRecord',
                JSON.stringify(payload)
            );
            if (data.success) {
                notify('Add success!', TypeToast.success);
                models.value = {
                    billId: '',
                    foodId: '',
                    quantity: '',
                };
            }
            store.dispatch(SET_LOADING, false);
        }
    } catch (error) {
        console.log(error);
        notify('Add fail!', TypeToast.error);
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
