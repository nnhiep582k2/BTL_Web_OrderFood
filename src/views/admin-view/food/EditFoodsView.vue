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
                label="foodDiscountType"
                :inputType="InputType.number"
                v-model:model-value="models.foodDiscountType"
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
                Update
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

interface IFoods {
    foodId: string;
    categoryId: string;
    foodName: string;
    foodStar: string;
    foodVote: string;
    foodDiscount: string;
    foodDiscountType: string;
    foodDesc: string;
    foodStatus: string;
    foodType: string;
    price: string;
    quantity: string;
    url: string;
}
const route = useRoute();
const store = useStore();
const models = ref<IFoods>({
    foodId: '',
    categoryId: '',
    foodName: '',
    foodStar: '',
    foodVote: '',
    foodDiscount: '',
    foodDiscountType: '0',
    foodDesc: '',
    foodStatus: '',
    foodType: '',
    price: '',
    quantity: '',
    url: '',
});
const errors = ref<String[]>([]);
const foodId = ref('');

onMounted(async () => {
    if (route.query.id) {
        foodId.value = route.query.id.toString();
    }
    if (foodId.value) {
        try {
            store.dispatch(SET_LOADING, true);
            let { data } = (
                await http.get(`/Foods/GetById?recordId=${foodId.value}`)
            ).data;
            models.value = {
                foodId: data.foodId,
                categoryId: data.categoryId,
                foodDiscountType: data.foodDiscountType,
                foodName: data.foodName,
                foodStar: data.foodStar,
                foodVote: data.foodVote,
                foodDiscount: data.foodDiscount,
                foodDesc: data.foodDesc,
                foodStatus: data.foodStatus,
                foodType: data.foodType,
                price: data.price,
                quantity: data.quantity,
                url: data.url,
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

        if (errors.value.length == 0) {
            const payload = {
                foodId: models.value.foodId,
                categoryId: models.value?.categoryId,
                foodName: models.value?.foodName,
                foodStar: Number.parseFloat(models.value?.foodStar),
                foodVote: models.value?.foodVote,
                foodDiscount: Number.parseFloat(models.value?.foodDiscount),
                foodDiscountType: Number.parseFloat(
                    models.value?.foodDiscountType
                ),
                foodDesc: models.value?.foodDesc,
                foodStatus: models.value?.foodStatus,
                foodType: models.value?.foodType,
                price: Number.parseFloat(models.value?.price),
                quantity: Number.parseInt(models.value?.quantity),
                url: models.value?.url,
            };
            store.dispatch(SET_LOADING, true);
            const { data } = await http.put(
                '/Foods/updateFood',
                JSON.stringify(payload)
            );
            console.log(data);
            if (data.success) {
                notify('Edit success!', TypeToast.success);
                router.push({ path: `/admin/foods` });
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
