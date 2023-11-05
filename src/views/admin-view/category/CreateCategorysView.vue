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
                label="Name"
                :inputType="InputType.text"
                v-model:model-value="models.name"
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
import { ref } from 'vue';
import { InputType } from '@/enums/TextBoxType';
import { SET_LOADING } from '@/stores/storeConstants';
import http from '@/services/http/http';
import { notify } from '@/services/Toast';
import { TypeToast } from '@/enums/TypeToast';

interface ICategorys {
    name: string;
}

const store = useStore();
const models = ref<ICategorys>({
    name: '',
});
const errors = ref<String[]>([]);

const handleSubmit = async () => {
    try {
        if (!models.value.name) {
            if (!errors.value.find((el) => el === 'Name is required')) {
                errors.value.push('Name is required');
            }
        } else {
            if (errors.value.find((el) => el === 'Name is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'Name is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }

        if (errors.value.length == 0) {
            const payload = {
                name: models.value.name,
            };
            store.dispatch(SET_LOADING, true);
            const { data } = await http.post(
                '/Categories/addRecord',
                JSON.stringify(payload)
            );
            if (data.success) {
                notify('Add success!', TypeToast.success);
                models.value = {
                    name: '',
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
