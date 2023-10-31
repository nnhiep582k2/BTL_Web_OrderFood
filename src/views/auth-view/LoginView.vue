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
                    <button @click="handleSubmit" class="btn">Login</button>

                    <p>
                        don't have an account?
                        <router-link @click="scrollToTop()" to="/register"
                            >create one
                        </router-link>
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

interface ILoginObj {
    username: string;
    password: string;
}

/**----------variable----------*/
const store = useStore();
const router = useRouter();
const loginObj = reactive<ILoginObj>({
    username: '',
    password: '',
});

const errors = reactive<String[]>([]);

/**----------computed----------*/
const authData = computed(() => store.getters['getAuthData']);
/**----------methods----------*/
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
            }
            // call API login
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
</script>

<style lang="scss" scoped>
.form-group button {
    width: 100%;
}
.login-container {
    padding: 2rem 9%;
    .login-form-container {
        background-color: #fff;
        height: 90vh;
    }
    form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 40rem;
        width: 100%;
        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
        border: 0.1rem solid rgba(0, 0, 0, 0.2);
        padding: 2rem;
        border-radius: 0.5rem;
        animation: fadeUp 0.4s linear;
        h3 {
            padding-bottom: 1rem;
            font-size: 2rem;
            font-weight: bolder;
            text-transform: uppercase;
            color: #130f40;
            margin: 0;
            text-align: center;
        }
        .form-control {
            margin: 0.7rem 0;
            border-radius: 0.5rem;
            background: #f7f7f7;
            padding: 2rem 1.2rem;
            font-size: 1.6rem;
            color: #130f40;
            text-transform: none;
            width: 100%;
            border: none;
        }
        .btn {
            margin: 1rem 0;
            width: 100%;
            text-align: center;
            background: var(--color-primary);
            color: #fff;
        }
        p {
            padding-top: 1rem;
            font-size: 1.5rem;
            color: #666;
            margin: 0;
            a {
                color: var(--color-primary);
            }
            &:hover {
                color: #130f40;
                text-decoration: underline;
            }
        }
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
                }
            }
        }
    }
}
</style>
