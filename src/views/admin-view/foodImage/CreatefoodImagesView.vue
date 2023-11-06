<template>
    <div v-if="errors.length" class="row error-box">
        <ul>
            <li v-for="(error, index) in errors" :key="index">
                {{ error }}
            </li>
        </ul>
    </div>

    <div class="row">
        <div class="col-md-6">
            <BaseTextBox
                width="100%"
                label="FoodId"
                :inputType="InputType.text"
                v-model:model-value="models.foodId"
            />
        </div>

        <div class="col-md-6" style="display: flex; flex-direction: column">
            <label for="">select image</label>
            <input width="100%" type="file" ref="myFile" />
        </div>

        <div class="col-md-12">
            <BaseTextBox
                width="100%"
                label="Type"
                :inputType="InputType.number"
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
import { ref } from 'vue';
import { InputType } from '@/enums/TextBoxType';
import { SET_LOADING } from '@/stores/storeConstants';
import http from '@/services/http/http';
import { notify } from '@/services/Toast';
import { TypeToast } from '@/enums/TypeToast';
import { storage } from '@/firebase/firebase-config';
import {
    getDownloadURL,
    ref as firebaseRef,
    uploadBytesResumable,
} from 'firebase/storage';

interface IFoodImages {
    foodId: string;
    url: string;
    type: string;
}

const store = useStore();
const models = ref<IFoodImages>({
    foodId: '',
    url: '',
    type: '',
});
const errors = ref<String[]>([]);
const myFile = ref();

const handleSubmit = async () => {
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

    // if (!models.value.url) {
    //     if (!errors.value.find((el) => el === "Image is required")) {
    //         errors.value.push("Image is required");
    //     }
    // } else {
    //     if (errors.value.find((el) => el === "Image is required")) {
    //         const indexusername = errors.value.findIndex(
    //             (el) => el === "Image is required"
    //         );
    //         errors.value.splice(indexusername, 1);
    //     }
    // }
    if (errors.value.length == 0) {
        // tham chiếu đến thư mục image trong firebase
        const storageRef: any = firebaseRef(
            storage,
            'images/' + myFile.value.files[0].name
        );

        // được sử dụng để tải lên một tệp tin dưới dạng byte
        const uploadTask = uploadBytesResumable(
            storageRef,
            myFile.value.files[0]
        );
        //  Đây là một phương thức để lắng nghe sự thay đổi trạng thái của quá trình tải lên. Có ba trạng thái có thể xảy ra: "paused" (đã tạm dừng), "running" (đang chạy) và các trạng thái khác.
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        console.log('Nothing at all');
                }
            },
            (error) => {
                console.log(error);
            },
            // ko lỗi
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadURL) => {
                        models.value.url = downloadURL;
                    }
                );
                try {
                    const payload = {
                        foodId: models.value.foodId,
                        url: models.value.url,
                        type: Number.parseInt(models?.value?.type),
                    };
                    store.dispatch(SET_LOADING, true);
                    const { data } = await http.post(
                        '/FoodImages/addRecord',
                        JSON.stringify(payload)
                    );
                    if (data.success) {
                        notify('Add success!', TypeToast.success);
                        models.value = {
                            foodId: '',
                            url: '',
                            type: '',
                        };
                    }
                    store.dispatch(SET_LOADING, false);
                } catch (error) {
                    console.log(error);
                    notify('Add fail!', TypeToast.error);
                    store.dispatch(SET_LOADING, false);
                }
            }
        );
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
