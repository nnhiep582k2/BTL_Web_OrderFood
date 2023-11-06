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
                label="FoodId"
                :inputType="InputType.text"
                v-model:model-value="models.foodId"
            />
        </div>
        <div class="col-md-12">
            <BaseTextBox
                width="100%"
                label="categoryId"
                :inputType="InputType.text"
                v-model:model-value="models.categoryId"
            />
        </div>
        <div class="col-md-12">
            <BaseTextBox
                width="100%"
                label="quantity"
                :inputType="InputType.number"
                v-model:model-value="models.quantity"
            />
        </div>
        <div class="col-md-12">
            <BaseTextBox
                width="100%"
                label="foodStar"
                :inputType="InputType.number"
                v-model:model-value="models.foodStar"
            />
        </div>
        <div class="col-md-12">
            <BaseTextBox
                width="100%"
                label="foodVote"
                :inputType="InputType.number"
                v-model:model-value="models.foodVote"
            />
        </div>
        <div class="col-md-12">
            <BaseTextBox
                width="100%"
                label="foodDiscount"
                :inputType="InputType.number"
                v-model:model-value="models.foodDiscount"
            />
        </div>
        <div class="col-md-12">
            <BaseTextBox
                width="100%"
                label="foodDesc"
                :inputType="InputType.number"
                v-model:model-value="models.foodDesc"
            />
        </div>
        <div class="col-md-12">
            <BaseTextBox
                width="100%"
                label="foodStatus"
                :inputType="InputType.number"
                v-model:model-value="models.foodStatus"
            />
        </div>
        <div class="col-md-12">
            <BaseTextBox
                width="100%"
                label="foodType"
                :inputType="InputType.number"
                v-model:model-value="models.foodType"
            />
        </div>
        <div class="col-md-12">
            <BaseTextBox
                width="100%"
                label="price"
                :inputType="InputType.number"
                v-model:model-value="models.price"
            />
        </div>
        <div class="col-md-12">
            <BaseTextBox
                width="100%"
                label="quantity"
                :inputType="InputType.number"
                v-model:model-value="models.quantity"
            />
        </div>
        <div class="col-md-12">
            <BaseTextBox
                width="100%"
                label="url"
                :inputType="InputType.number"
                v-model:model-value="models.url"
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

interface IFoods {
    foodId: string;
    categoryId: string;
    foodName: string;
    foodStar: string;
    foodVote: string;
    foodDiscount: string;
    foodDesc: string;
    foodStatus: string;
    foodType: string;
    price: string;
    quantity: string;
    url: string;
}

const store = useStore();
const models = ref<IFoods>({
    foodId: '',
    categoryId: '',
    foodName: '',
    foodStar: '',
    foodVote: '',
    foodDiscount: '',
    foodDesc: '',
    foodStatus: '',
    foodType: '',
    price: '',
    quantity: '',
    url: '',
});
const errors = ref<String[]>([]);

const handleSubmit = async () => {
    try {
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

        if (!models.value.categoryId) {
            if (!errors.value.find((el) => el === 'categoryId is required')) {
                errors.value.push('categoryId is required');
            }
        } else {
            if (errors.value.find((el) => el === 'categoryId is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'categoryId is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }
        if (!models.value.foodName) {
            if (!errors.value.find((el) => el === 'foodName is required')) {
                errors.value.push('foodName is required');
            }
        } else {
            if (errors.value.find((el) => el === 'foodName is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'foodName is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }
        if (!models.value.foodStar) {
            if (!errors.value.find((el) => el === 'foodStar is required')) {
                errors.value.push('foodStar is required');
            }
        } else {
            if (errors.value.find((el) => el === 'foodStar is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'foodStar is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }
        if (!models.value.foodVote) {
            if (!errors.value.find((el) => el === 'foodVote is required')) {
                errors.value.push('foodVote is required');
            }
        } else {
            if (errors.value.find((el) => el === 'foodVote is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'foodVote is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }
        if (!models.value.foodDiscount) {
            if (!errors.value.find((el) => el === 'foodDiscount is required')) {
                errors.value.push('foodDiscount is required');
            }
        } else {
            if (errors.value.find((el) => el === 'foodDiscount is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'foodDiscount is required'
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
        if (!models.value.foodDesc) {
            if (!errors.value.find((el) => el === 'foodDesc is required')) {
                errors.value.push('foodDesc is required');
            }
        } else {
            if (errors.value.find((el) => el === 'foodDesc is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'foodDesc is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }
        if (!models.value.foodStatus) {
            if (!errors.value.find((el) => el === 'foodStatus is required')) {
                errors.value.push('foodStatus is required');
            }
        } else {
            if (errors.value.find((el) => el === 'foodStatus is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'foodStatus is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }

        if (!models.value.foodType) {
            if (!errors.value.find((el) => el === 'foodType is required')) {
                errors.value.push('foodType is required');
            }
        } else {
            if (errors.value.find((el) => el === 'foodType is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'foodType is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }
        if (!models.value.price) {
            if (!errors.value.find((el) => el === 'price is required')) {
                errors.value.push('price is required');
            }
        } else {
            if (errors.value.find((el) => el === 'price is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'price is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }
        if (!models.value.url) {
            if (!errors.value.find((el) => el === 'url is required')) {
                errors.value.push('url is required');
            }
        } else {
            if (errors.value.find((el) => el === 'url is required')) {
                const indexusername = errors.value.findIndex(
                    (el) => el === 'url is required'
                );
                errors.value.splice(indexusername, 1);
            }
        }

        if (errors.value.length == 0) {
            const payload = {
                foodId: models.value?.foodId,
                categoryId: models.value?.categoryId,
                foodName: models.value?.foodName,
                foodStar: models.value?.foodStar,
                foodVote: models.value?.foodVote,
                foodDiscount: models.value?.foodDiscount,
                foodDesc: models.value?.foodDesc,
                foodStatus: models.value?.foodStatus,
                foodType: models.value?.foodType,
                price: models.value?.price,
                quantity: models.value?.quantity,
                url: models.value?.url,
            };
            store.dispatch(SET_LOADING, true);
            const { data } = await http.post(
                '/Foods/addRecord',
                JSON.stringify(payload)
            );
            if (data.success) {
                notify('Add success!', TypeToast.success);
                models.value = {
                    foodId: '',
                    categoryId: '',
                    foodName: '',
                    foodStar: '',
                    foodVote: '',
                    foodDiscount: '',
                    foodDesc: '',
                    foodStatus: '',
                    foodType: '',
                    price: '',
                    quantity: '',
                    url: '',
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
