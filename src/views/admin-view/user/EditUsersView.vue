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
                label="FullName"
                :inputType="InputType.text"
                v-model:model-value="models.fullName"
            />
        </div>

        <div class="col-md-6">
            <BaseTextBox
                width="100%"
                label="Username"
                :inputType="InputType.text"
                v-model:model-value="models.username"
            />
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <BaseTextBox
                width="100%"
                label="Email"
                :inputType="InputType.text"
                v-model:model-value="models.email"
            />
        </div>
        <div class="col-md-6">
            <BaseTextBox
                width="100%"
                label="PhoneNumber"
                :inputType="InputType.text"
                v-model:model-value="models.phoneNumber"
            />
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <BaseTextBox
                width="100%"
                label="Address"
                :inputType="InputType.text"
                v-model:model-value="models.address"
            />
        </div>
        <div class="col-md-6">
            <label for="">Avatar</label>
            <input width="100%" type="file" ref="myFile" />
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <BaseTextBox
                width="100%"
                label="RoleId"
                :inputType="InputType.text"
                v-model:model-value="models.roleId"
            />
        </div>
        <div class="form-group">
            <label for="">Select your gender </label>
            <div class="form-group row">
                <BaseRadioGroup
                    class="m-b-10 col-md-6"
                    id="male"
                    label="male"
                    v-model="models.gender"
                    :value="Gender.male"
                />
                <BaseRadioGroup
                    class="m-b-10 col-md-6"
                    id="Female"
                    label="Female"
                    v-model="models.gender"
                    :value="Gender.female"
                />
                <BaseRadioGroup
                    class="m-b-10 col-md-6"
                    id="other"
                    label="other"
                    v-model="models.gender"
                    :value="Gender.other"
                />
            </div>
        </div>
        <div class="col-md-12 mt-3">
            <button class="btn_add btn btn-success" @click="handleSubmit">
                Edit
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseTextBox from "@/components/BaseTextBox.vue";
import { useStore } from "vuex";
import BaseRadioGroup from "@/components/BaseRadioGroup.vue";
import { onMounted, ref } from "vue";
import { InputType } from "@/enums/TextBoxType";
import { SET_LOADING } from "@/stores/storeConstants";
import http from "@/services/http/http";
import { notify } from "@/services/Toast";
import { TypeToast } from "@/enums/TypeToast";
import { useRoute } from "vue-router";
import router from "@/router";
import { Gender } from "@/enums/Gender";
import { storage } from "@/firebase/firebase-config";

import {
    getDownloadURL,
    ref as firebaseRef,
    uploadBytesResumable,
} from "firebase/storage";

interface IUsers {
    fullName: string;
    username: string;
    email: string;
    phoneNumber: string;
    address: string;
    avatar: string;
    gender: string;
    roleId: string;
}
const route = useRoute();
const store = useStore();
const models = ref<IUsers>({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    avatar: "",
    gender: "",
    roleId: "",
});
const errors = ref<string[]>([]);
const userId = ref("");
const myFile = ref();
onMounted(async () => {
    if (route.query.id) {
        userId.value = route.query.id.toString();
    }
    if (userId.value) {
        try {
            store.dispatch(SET_LOADING, true);
            let { data } = (
                await http.get(`/Auth/GetById?recordId=${userId.value}`)
            ).data;
            models.value = {
                fullName: data?.fullName,
                username: data?.username,
                email: data?.email,
                phoneNumber: data?.phoneNumber,
                address: data?.address,
                avatar: data?.avatar,
                gender: data?.gender,
                roleId: data?.roleId,
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
    if (!models.value.fullName) {
        if (!errors.value.find((el) => el === "FullName is required")) {
            errors.value.push("FullName is required");
        }
    } else {
        if (errors.value.find((el) => el === "FullName is required")) {
            const indexusername = errors.value.findIndex(
                (el) => el === "FullName is required"
            );
            errors.value.splice(indexusername, 1);
        }
    }

    if (!models.value.username) {
        if (!errors.value.find((el) => el === "Username is required")) {
            errors.value.push("Username is required");
        }
    } else {
        if (errors.value.find((el) => el === "Username is required")) {
            const indexusername = errors.value.findIndex(
                (el) => el === "Username is required"
            );
            errors.value.splice(indexusername, 1);
        }
    }

    if (!models.value.email) {
        if (!errors.value.find((el) => el === "Email is required")) {
            errors.value.push("Email is required");
        }
    } else {
        if (errors.value.find((el) => el === "Email is required")) {
            const indexusername = errors.value.findIndex(
                (el) => el === "Email is required"
            );
            errors.value.splice(indexusername, 1);
        }
    }

    if (!models.value.phoneNumber) {
        if (!errors.value.find((el) => el === "PhoneNumber is required")) {
            errors.value.push("PhoneNumber is required");
        }
    } else {
        if (errors.value.find((el) => el === "PhoneNumber is required")) {
            const indexusername = errors.value.findIndex(
                (el) => el === "PhoneNumber is required"
            );
            errors.value.splice(indexusername, 1);
        }
    }

    if (!models.value.roleId) {
        if (!errors.value.find((el) => el === "RoleId is required")) {
            errors.value.push("RoleId is required");
        }
    } else {
        if (errors.value.find((el) => el === "RoleId is required")) {
            const indexusername = errors.value.findIndex(
                (el) => el === "RoleId is required"
            );
            errors.value.splice(indexusername, 1);
        }
    }
    if (errors.value.length == 0) {
        // tham chiếu đến thư mục image trong firebase
        const storageRef: any = firebaseRef(
            storage,
            "images/" + myFile.value.files[0].name
        );

        // được sử dụng để tải lên một tệp tin dưới dạng byte
        const uploadTask = uploadBytesResumable(
            storageRef,
            myFile.value.files[0]
        );
        //  Đây là một phương thức để lắng nghe sự thay đổi trạng thái của quá trình tải lên. Có ba trạng thái có thể xảy ra: "paused" (đã tạm dừng), "running" (đang chạy) và các trạng thái khác.
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        console.log("Nothing at all");
                }
            },
            (error) => {
                console.log(error);
            },
            // ko lỗi
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadURL) => {
                        models.value.avatar = downloadURL;
                    }
                );
                try {
                    const payload = {
                        userId: userId.value,
                        fullName: models?.value?.fullName,
                        username: models?.value?.username,
                        email: models?.value?.email,
                        phoneNumber: models?.value?.phoneNumber,
                        address: models?.value?.address,
                        avatar: models?.value?.avatar,
                        gender: Number.parseInt(models?.value?.gender),
                        roleId: models?.value?.roleId,
                    };
                    store.dispatch(SET_LOADING, true);
                    const { data } = await http.put(
                        "/Auth/updateRecord",
                        JSON.stringify(payload)
                    );
                    if (data.success) {
                        notify("Edit success!", TypeToast.success);
                        router.push({ path: `/admin/auth` });
                    }
                    store.dispatch(SET_LOADING, false);
                } catch (error) {
                    console.log(error);
                    notify("Add fail!", TypeToast.error);
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
