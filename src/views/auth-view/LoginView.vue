<template>
    <div class="login-container">
        <div class="login-form-container">
            <form
                id="loginForm"
                novalidate
                autocomplete="off"
                @submit="handleSubmit"
            >
                <h3>LOGIN</h3>

                <div v-if="errors.length" class="error-box">
                    <ul>
                        <li v-for="(error, index) in errors" :key="index">
                            {{ error }}
                        </li>
                    </ul>
                </div>

                <div class="form-group">
                    <BaseTextBox
                        classes="form-control"
                        placeholder="enter your username"
                        v-model="loginObj.username"
                        width="100%"
                    />
                </div>

                <div class="form-group">
                    <BaseTextBox
                        classes="form-control"
                        :input-type="InputType.passwords"
                        placeholder="enter your password"
                        v-model="loginObj.password"
                        width="100%"
                    />
                </div>

                <div class="form-group">
                    <BaseButton
                        :type="ButtonType.success"
                        text="Login"
                        @click="handleSubmit"
                    />

                    <p>
                        Don't have an account?
                        <RouterLink @click="scrollToTop()" to="/register"
                            >Create one
                        </RouterLink>
                    </p>
                </div>
            </form>
        </div>
    </div>
    0
</template>

<script setup lang="ts">
import BaseTextBox from '@/components/BaseTextBox.vue';
import { TypeToast } from '@/enums/TypeToast';
import { notify } from '@/services/Toast';
import { LOGIN_ACTION, SET_LOADING } from '@/stores/storeConstants';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { InputType } from '@/enums/TextBoxType';
import BaseButton from '@/components/BaseButton.vue';
import { ButtonType } from '@/enums/ButtonType';

interface ILoginObj {
    username: string;
    password: string;
}

const store = useStore();
const router = useRouter();
const loginObj = reactive<ILoginObj>({
    username: '',
    password: '',
});
const errors = reactive<String[]>([]);
const authData = computed(() => store.getters['getAuthData']);

const handleSubmit = async (e: Event) => {
    if (!loginObj.username) {
        if (!errors.find((el) => el === 'username is required')) {
            errors.push('username is required');
        }
    } else {
        if (errors.find((el) => el === 'username is required')) {
            const indexusername = errors.findIndex(
                (el) => el === 'username is required'
            );
            errors.splice(indexusername, 1);
        }
    }

    if (!loginObj.password) {
        if (!errors.find((el) => el === 'Password is required')) {
            errors.push('Password is required');
        }
    } else {
        if (errors.find((el) => el === 'Password is required')) {
            const indexusername = errors.findIndex(
                (el) => el === 'Password is required'
            );
            errors.splice(indexusername, 1);
        }
    }

    if (errors.length == 0) {
        e?.preventDefault();
        // call API login
        try {
            const payload = {
                username: loginObj.username.trim(),
                password: loginObj.password.trim(),
            };
            store.dispatch(SET_LOADING, true);
            await store.dispatch(`${LOGIN_ACTION}`, payload);
            if (authData.value?.userId) {
                router.push({ path: '/' });
                localStorage.setItem('userId', authData.value?.userId);
                localStorage.setItem('jwtToken', authData.value?.token);
            }
        } catch (error: any) {
            store.dispatch(SET_LOADING, false);
            notify(`${error.message}`, TypeToast.error);
        } finally {
            store.dispatch(SET_LOADING, false);
        }
    } else {
        e?.preventDefault();
    }
};

const scrollToTop = () => {
    window.scrollTo(0, 0);
};

scrollToTop();
</script>

<style lang="scss" scoped>
@import url(./LoginStyle.scss);
</style>
