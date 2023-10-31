<template>
    <div class="register-container">
        <div class="register-form-container">
            <form id="registerForm" novalidate autocomplete="off">
                <h3>Create your account</h3>
                <div class="form-group">
                    <label for="uName"
                        >Enter your fullname<span>*</span>
                    </label>
                    <BaseTextBox
                        placeholder="your full name"
                        classes="form-control"
                        v-model="registerObj.FullName"
                        width="100%"
                    />
                    <p
                        class="error-mess"
                        v-if="errorObj.fullNameError.length > 0"
                    >
                        {{ errorObj.fullNameError[0] }}
                    </p>
                </div>

                <div class="form-group">
                    <label for="uName"
                        >Enter your username<span>*</span>
                    </label>
                    <BaseTextBox
                        placeholder="your user name"
                        classes="form-control"
                        v-model="registerObj.UserName"
                        width="100%"
                    />
                    <p
                        class="error-mess"
                        v-if="errorObj.userNameErr.length > 0"
                    >
                        {{ errorObj.userNameErr[0] }}
                    </p>
                </div>

                <div class="form-group">
                    <label for="uEmail">Enter your email<span>*</span></label>

                    <BaseTextBox
                        placeholder="your email"
                        width="100%"
                        classes="form-control"
                        v-model="registerObj.email"
                    />

                    <p class="error-mess" v-if="errorObj.emailErr.length > 0">
                        {{ errorObj.emailErr[0] }}
                    </p>
                </div>

                <div class="form-group">
                    <label for="uPass">Enter your password<span>*</span></label>

                    <BaseTextBox
                        placeholder="enter your password"
                        classes="form-control"
                        :inputType="InputType.passwords"
                        v-model="registerObj.password"
                        width="100%"
                    />
                    <p class="error-mess" v-if="errorObj.passErr.length > 0">
                        {{ errorObj.passErr[0] }}
                    </p>
                </div>

                <div class="form-group">
                    <label for="uPassConfirm"
                        >Check your password again<span>*</span>
                    </label>

                    <BaseTextBox
                        placeholder="enter your password again"
                        classes="form-control"
                        :inputType="InputType.passwords"
                        v-model="registerObj.confirm"
                        width="100%"
                    />

                    <p class="error-mess" v-if="errorObj.confirmErr.length > 0">
                        {{ errorObj.confirmErr[0] }}
                    </p>
                </div>

                <div class="form-group">
                    <label for="uPhone"
                        >Enter your phone number<span>*</span></label
                    >
                    <BaseTextBox
                        placeholder="Enter your phone number"
                        classes="form-control"
                        v-model="registerObj.phone"
                        width="100%"
                    />
                    <p class="error-mess" v-if="errorObj.phoneErr.length > 0">
                        {{ errorObj.phoneErr[0] }}
                    </p>
                </div>

                <div class="form-group">
                    <label for="">Select your gender </label>
                    <div class="form-group">
                        <BaseRadioGroup
                            class="m-b-10"
                            id="male"
                            label="male"
                            v-model="registerObj.gender"
                            :value="Gender.male"
                        />
                        <BaseRadioGroup
                            class="m-b-10"
                            id="Female"
                            label="Female"
                            v-model="registerObj.gender"
                            :value="Gender.female"
                        />
                        <BaseRadioGroup
                            class="m-b-10"
                            id="other"
                            label="other"
                            v-model="registerObj.gender"
                            :value="Gender.other"
                        />
                    </div>
                    <p class="error-mess" v-if="errorObj.genderErr.length > 0">
                        {{ errorObj.genderErr[0] }}
                    </p>
                </div>

                <div class="form-group">
                    <button @click="handleSubmitSignUp" class="btn">
                        Signup
                    </button>

                    <p>
                        have an account?
                        <router-link @click="scrollToTop()" to="/login"
                            >login</router-link
                        >
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Gender } from "@/enums/Gender";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import BaseTextBox from "@/components/BaseTextBox.vue";
import BaseRadioGroup from "@/components/BaseRadioGroup.vue";
import { useStore } from "vuex";
import { notify } from "@/services/Toast";
import axios from "axios";
import { TypeToast } from "@/enums/TypeToast";
import { InputType } from "@/enums/TextBoxType";
import http from "@/services/http/http";

interface IRegisterObj {
    FullName: string;
    UserName: string;
    email: string;
    password: string;
    confirm: string;
    phone: string;
    gender: Gender;
}

interface IErrorObject {
    userNameErr: Array<string>;
    fullNameError: Array<string>;
    emailErr: Array<string>;
    passErr: Array<String>;
    confirmErr: Array<string>;
    phoneErr: Array<string>;
    genderErr: Array<string>;
}

/**----------variable----------*/
const registerObj = reactive<IRegisterObj>({
    FullName: "",
    UserName: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
    gender: Gender.male,
});
const store = useStore();
const router = useRouter();
const errorObj = reactive<IErrorObject>({
    userNameErr: [],
    fullNameError: [],
    emailErr: [],
    passErr: new Array(3),
    confirmErr: [],
    phoneErr: [],
    genderErr: [],
});

const matchUser = ref(null);

/**----------methods----------*/
const scrollToTop = () => {
    window.scrollTo(0, 0);
};

const checkForm = () => {
    resetCheckErr();

    // FullName validate
    if (!registerObj.FullName) {
        errorObj.fullNameError.push("Entering a FullName is required");
    } else {
        if (
            errorObj.fullNameError.find(
                (el) => el === "Entering a FullName is required"
            )
        ) {
            const indexEmail = errorObj.fullNameError.findIndex(
                (el) => el === "Entering a FullName is required"
            );
            errorObj.fullNameError.splice(indexEmail, 1);
        }

        if (!/^[A-Za-z]+$/.test(registerObj.FullName.replace(/\s/g, ""))) {
            errorObj.fullNameError.push("A FullName can only contain letters");
        } else {
            const indexEmail = errorObj.fullNameError.findIndex(
                (el) => el === "A FullName can only contain letters"
            );
            errorObj.fullNameError.splice(indexEmail, 1);
        }
    }

    // check username
    if (!registerObj.UserName) {
        errorObj.userNameErr.push("Entering a UserName is required");
    } else {
        if (
            errorObj.userNameErr.find(
                (el) => el === "Entering a UserName is required"
            )
        ) {
            const indexEmail = errorObj.userNameErr.findIndex(
                (el) => el === "Entering a UserName is required"
            );
            errorObj.userNameErr.splice(indexEmail, 1);
        }
    }

    // Email validate
    if (!registerObj.email) {
        errorObj.emailErr.push("Entering a email is required");
    } else {
        if (
            errorObj.emailErr.find(
                (el) => el === "Entering a email is required"
            )
        ) {
            const indexEmail = errorObj.emailErr.findIndex(
                (el) => el === "Entering a email is required"
            );
            errorObj.emailErr.splice(indexEmail, 1);
        }
        if (
            !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(registerObj.email)
        ) {
            errorObj.emailErr.push("Email must be valid");
        } else {
            const indexEmail = errorObj.emailErr.findIndex(
                (el) => el === "Email must be valid"
            );
            errorObj.emailErr.splice(indexEmail, 1);
        }
    }

    // Pass validate
    if (!registerObj.password) {
        errorObj.passErr.push("Password is required");
    } else {
        if (errorObj.passErr.find((el) => el === "Password is required")) {
            const indexEmail = errorObj.passErr.findIndex(
                (el) => el === "Password is required"
            );
            errorObj.passErr.splice(indexEmail, 1);
        }
        if (!/[!@#$%^&*]/.test(registerObj.password)) {
            errorObj.passErr.push(
                "Password must contain at least 1 special character"
            );
        } else {
            const indexEmail = errorObj.passErr.findIndex(
                (el) =>
                    el === "Password must contain at least 1 special character"
            );
            errorObj.passErr.splice(indexEmail, 1);
        }

        if (registerObj.password.length < 8) {
            errorObj.passErr.push(
                "Password must be more than or equal 8 characters"
            );
        } else {
            const indexEmail = errorObj.passErr.findIndex(
                (el) =>
                    el === "Password must contain at least 1 special character"
            );
            errorObj.passErr.splice(indexEmail, 1);
        }
    }

    // Confirm Pass validate
    if (!registerObj.confirm) {
        errorObj.confirmErr.push("Confirm password is required");
    } else {
        const indexEmail = errorObj.confirmErr.findIndex(
            (el) => el === "Confirm password is required"
        );
        errorObj.confirmErr.splice(indexEmail, 1);
        if (registerObj.password !== registerObj.confirm) {
            errorObj.confirmErr.push(
                "Confirm password must be match with password"
            );
        } else {
            const indexEmail = errorObj.confirmErr.findIndex(
                (el) => el === "Confirm password must be match with password"
            );
            errorObj.confirmErr.splice(indexEmail, 1);
        }
    }

    // Phone validate
    if (!registerObj.phone) {
        errorObj.phoneErr.push("Entering phone number is required");
    } else {
        const indexEmail = errorObj.phoneErr.findIndex(
            (el) => el === "Entering phone number is required"
        );
        errorObj.phoneErr.splice(indexEmail, 1);
        if (!registerObj.phone.startsWith("84")) {
            errorObj.phoneErr.push("Phone numbers must start with 84");
        } else {
            const indexEmail = errorObj.phoneErr.findIndex(
                (el) => el === "Phone numbers must start with 84"
            );
            errorObj.phoneErr.splice(indexEmail, 1);
        }

        if (registerObj.phone.length != 11) {
            errorObj.phoneErr.push("Phone numbers must have exactly 11 digits");
        } else {
            const indexEmail = errorObj.phoneErr.findIndex(
                (el) => el === "Phone numbers must have exactly 11 digits"
            );
            errorObj.phoneErr.splice(indexEmail, 1);
        }

        if (!/[0-9]{11}/.test(registerObj.phone)) {
            errorObj.phoneErr.push("Phone numbers can only contain numbers");
        } else {
            const indexEmail = errorObj.phoneErr.findIndex(
                (el) => el === "Phone numbers can only contain numbers"
            );
            errorObj.phoneErr.splice(indexEmail, 1);
        }
    }

    // Gender validate
    if (registerObj.gender) {
        errorObj.genderErr.push("Please select a gender");
    } else {
        const indexEmail = errorObj.genderErr.findIndex(
            (el) => el === "Please select a gender"
        );
        errorObj.genderErr.splice(indexEmail, 1);
    }
};

const handleSubmitSignUp = async (event: Event): Promise<void> => {
    checkForm();

    event.preventDefault();
    if (!checkEmptyErr()) {
    } else {
        try {
            let payload = {
                fullName: registerObj.FullName,
                username: registerObj.UserName,
                passwordHash: registerObj.password,
                email: registerObj.email,
                phoneNumber: registerObj.phone,
                gender: registerObj.gender,
            };
            const data: any = await http.post(
                "/Auth/register",
                JSON.stringify(payload)
            );

            if (data.status === 200) {
                router.push({ path: "/login" });
            } else {
                notify(`${data?.response?.data?.message}`, TypeToast.error);
            }
        } catch (error: any) {
            if (error.response.status === 400) {
                notify(`${error?.response?.data?.message}`, TypeToast.error);
            } else {
                notify(`${error}`, TypeToast.error);
            }
        }
    }
};

const resetCheckErr = () => {
    errorObj.fullNameError = [];
    errorObj.userNameErr = [];
    errorObj.emailErr = [];
    errorObj.passErr = [];
    errorObj.confirmErr = [];
    errorObj.phoneErr = [];
    errorObj.genderErr = [];
};

const checkEmptyErr = () => {
    for (var typeErr in errorObj) {
        if (errorObj[typeErr].length != 0) {
            return false;
        }
    }
    return true;
};
</script>

<style lang="scss" scoped>
.register-container {
    padding: 2rem 9%;

    .register-form-container {
        background: #fff;

        form {
            position: relative;
            left: 50%;
            transform: translate(-50%, 0%);
            max-width: 70rem;
            width: 100%;
            box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
            border: 0.1rem solid rgba(0, 0, 0, 0.2);
            padding: 2rem;
            border-radius: 0.5rem;
            animation: fadeUp 0.4s linear;

            h3 {
                padding-bottom: 1rem;
                font-size: 2rem;
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

            label {
                font-size: 20px;
                margin: 0;
                padding: 0;
                span {
                    color: rgb(243, 47, 47);
                }
            }

            span {
                font-size: 18px;
                padding-left: 5px;
                padding-right: 40px;
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

                    &:hover {
                        color: #130f40;
                        text-decoration: underline;
                    }
                }
            }

            .form-group {
                margin: 10px 0 0 0;
                .error-mess {
                    position: relative;
                    color: rgb(243, 47, 47);
                    margin: 0;
                    padding: 0;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
