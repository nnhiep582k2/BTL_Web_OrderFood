<template>
    <div v-if="errors.length" class="row error-box">
        <ul>
            <li v-for="(error, index) in errors" :key="index">
                {{ error }}
            </li>
        </ul>
    </div>
    <div class="row">
        <div class="col-md-6 col-md-6">
            <BaseTextBox
                width="100%"
                label="UserId"
                :inputType="InputType.text"
                v-model:model-value="models.userId"
            />
        </div>
        <div class="col-md-6">
            <label for="">Select your paid </label>
            <div class="row">
                <BaseRadioGroup
                    class="m-b-10 col-md-6"
                    id="true"
                    label="true"
                    v-model="models.paid"
                    :value="true"
                />
                <BaseRadioGroup
                    class="m-b-10 col-md-6"
                    id="false"
                    label="false"
                    v-model="models.paid"
                    :value="false"
                />
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <label for="">Select your status </label>
            <div class="form-group">
                <div class="row">
                    <BaseRadioGroup
                        class="m-b-10 col-md-3"
                        id="Cancel"
                        label="Cancel"
                        v-model="models.status"
                        :value="StatusBill.cancel"
                    />
                    <BaseRadioGroup
                        class="m-b-10 col-md-3"
                        id="Confirmed"
                        label="Confirmed"
                        v-model="models.status"
                        :value="StatusBill.confirmed"
                    />
                    <BaseRadioGroup
                        class="m-b-10 col-md-3"
                        id="Preparing"
                        label="Preparing"
                        v-model="models.status"
                        :value="StatusBill.preparing"
                    />
                    <BaseRadioGroup
                        class="m-b-10 col-md-3"
                        id="Checking"
                        label="Checking"
                        v-model="models.status"
                        :value="StatusBill.checking"
                    />
                </div>
                <div class="row">
                    <BaseRadioGroup
                        class="m-b-10 col-md-3"
                        id="Delivering"
                        label="Delivering"
                        v-model="models.status"
                        :value="StatusBill.delivering"
                    />
                    <BaseRadioGroup
                        class="m-b-10 col-md-3"
                        id="Delivered"
                        label="Delivered"
                        v-model="models.status"
                        :value="StatusBill.delivered"
                    />
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <BaseTextBox
                width="100%"
                label="Total"
                :inputType="InputType.text"
                v-model:model-value="models.total"
            />
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <BaseTextBox
                width="100%"
                label="Method"
                :inputType="InputType.text"
                v-model:model-value="models.method"
            />
        </div>
        <div class="col-md-6">
            <BaseTextBox
                width="100%"
                label="Discount"
                :inputType="InputType.text"
                v-model:model-value="models.discount"
            />
        </div>
    </div>
    <div class="col-md-12">
        <BaseTextBox
            width="100%"
            label="Delivery"
            :inputType="InputType.text"
            v-model:model-value="models.delivery"
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
import BaseRadioGroup from '@/components/BaseRadioGroup.vue';
import { StatusBill } from '@/enums/StatusBill';

interface IBill {
    userId: string;
    paid: string;
    status: string;
    total: string;
    method: string;
    discount: string;
    delivery: string;
}
const store = useStore();
const models = ref<IBill>({
    userId: '',
    paid: '',
    status: '',
    total: '',
    method: '',
    discount: '',
    delivery: '',
});
const errors = ref<String[]>([]);

const handleSubmit = async () => {
    try {
        if (!models.value.userId) {
            if (!errors.value.find((el) => el === 'userId is required')) {
                errors.value.push('userId is required');
            }
        } else {
            if (errors.value.find((el) => el === 'userId is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'userId is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }

        if (!models.value.status) {
            if (!errors.value.find((el) => el === 'Status is required')) {
                errors.value.push('Status is required');
            }
        } else {
            if (errors.value.find((el) => el === 'Status is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'Status is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }

        if (!models.value.total) {
            if (!errors.value.find((el) => el === 'Total is required')) {
                errors.value.push('Total is required');
            }
        } else {
            if (errors.value.find((el) => el === 'Total is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'Total is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }
        if (errors.value.length == 0) {
            const payload = {
                userId: models.value.userId,
                paid: models.value.paid.toString(),
                status: Number.parseInt(models.value.status),
                total: Number.parseFloat(models.value.total),
                method: models.value.method,
                discount: Number.parseInt(models.value.discount),
                delivery: Number.parseInt(models.value.delivery),
            };
            store.dispatch(SET_LOADING, true);
            const { data } = await http.post(
                '/Bills/addRecord',
                JSON.stringify(payload)
            );
            if (data.success) {
                notify('Add success!', TypeToast.success);
                models.value = {
                    userId: '',
                    paid: '',
                    status: '',
                    total: '',
                    method: '',
                    discount: '',
                    delivery: '',
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
