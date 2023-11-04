<template>
    <div class="header p-x-80">
        <RouterLink to="/">
            <div class="brand">
                <div class="logo">
                    <img
                        src="/src/assets/images/common/logo.png"
                        alt="logo orod"
                    />
                </div>
                <div class="name">Orod</div>
            </div>
        </RouterLink>
        <div class="list d-flex">
            <div
                class="item"
                v-for="(item, index) in HeaderItem"
                :key="index"
                :class="{ active: isCurrentTab(item) }"
                @click="setActiveTab(item)"
            >
                {{ item }}
            </div>
        </div>
        <div class="options d-flex">
            <div class="option">
                <RouterLink to="/cart">
                    <BaseIcon>
                        <i class="fa-solid fa-cart-shopping"></i
                    ></BaseIcon>
                </RouterLink>
            </div>
            <div class="option">
                <BaseIcon
                    v-if="!authData?.userId"
                    classes="account"
                    @click="() => showLog()"
                    ><i class="fa-solid fa-user"></i>
                    <ul class="drop-down-select" ref="dropdown">
                        <li>
                            <router-link @click="scrollToTop()" to="/login"
                                >Login</router-link
                            >
                        </li>
                        <li>
                            <router-link @click="scrollToTop()" to="/register"
                                >Register</router-link
                            >
                        </li>
                    </ul>
                </BaseIcon>

                <BaseIcon v-else @click="() => showLog()" classes="account">
                    <i class="fa-solid fa-user"></i>
                    <ul class="drop-down-select" ref="dropdown">
                        <li v-if="isAdmin">
                            <router-link
                                @click="scrollToTop()"
                                to="/admin/users"

                                >Admin page</router-link
                            >
                        </li>
                        <li>
                            <router-link @click="scrollToTop()" to="/order"
                                >my orders</router-link
                            >
                        </li>
                        <li>
                            <router-link @click="handleLogout" to="/"
                                >logout</router-link
                            >
                        </li>
                    </ul>
                </BaseIcon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { HeaderItem } from "@/mocks/HeaderItem";
import { useRouter, useRoute } from "vue-router";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import BaseIcon from "@/components/BaseIcon.vue";
import { useStore } from "vuex";
import {
    ADMIN_ACTION,
    LOGOUT_ACTION,
    SET_LOADING,
} from "@/stores/storeConstants";
import { Role } from "@/enums/Role";
import http from "@/services/http/http";


const store = useStore();
const router = useRouter();
const currentTab = ref(HeaderItem[0]);
const isCurrentTab = (tab: string) => currentTab.value === tab;

const setActiveTab = (tab: string) => {
    if (tab == 'Menu') {
        router.push({
            name: tab.toLowerCase(),
            params: {
                item: 'all',
            },
        });
    } else
        router.push({
            name: tab.toLowerCase(),
        });
};

const route = useRoute();
const authData = computed(() => store.getters['getAuthData']);
const dropdown = ref();
const excludedElements = ref<any[]>([]);
const isAdmin = ref<boolean>(false);

watch(
    () => route.name,
    (newValue) => {
        if (newValue) {
            currentTab.value =
                newValue.toString().slice(0, 1).toLocaleUpperCase() +
                newValue.toString().slice(1);
        }
    }
);

watch(
    authData,
    async(newValue) => {
        isAdmin.value = await clientSideCheckAdminRole(newValue?.token);

        store.dispatch(ADMIN_ACTION, isAdmin.value);
    },
    { deep: true }
);

const clientSideCheckAdminRole = async (jwt: string) => {
    if (jwt) {
        try {
            store.dispatch(SET_LOADING, true);
            const { data } = (await http.post("/Auth/CheckRole?jwt=" + jwt))
            store.dispatch(SET_LOADING, false);
            return data;
        } catch (error) {
            store.dispatch(SET_LOADING, false);
        }

    }
    return false;
};

const showLog = () => {
    let log = document.querySelector('.drop-down-select') as HTMLElement;
    log.classList.add('active');
};

onMounted(() => {
    window.addEventListener('click', handleClickOutSide);
    excludedElements.value.push(document.querySelector('.account'));
    excludedElements.value.push(document.querySelector('.fa-user'));
});

onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutSide);
});

const handleClickOutSide = (event) => {
    if (
        dropdown.value &&
        !dropdown.value.contains(event.target) &&
        !excludedElements.value.some(
            (el) => el.className == event.target.className
        )
    ) {
        let log = document.querySelector('.drop-down-select') as HTMLElement;
        log.classList.remove('active');
    }
};

const scrollToTop = () => {
    window.scrollTo(0, 0);
};

const handleLogout = () => {
    store.dispatch(`${LOGOUT_ACTION}`, null);
    localStorage.removeItem('userId');
    localStorage.removeItem('jwtToken');
};
</script>

<style lang="scss" scoped>
.header {
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: white;
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.05);
    a {
        color: black;
        display: block;
        text-decoration: none;
    }
    .brand {
        user-select: none;
        font-size: 25px;
        font-weight: 600;
        display: flex;
        align-items: center;
        .logo {
            width: 30px;
            overflow: hidden;
            display: flex;
            margin-right: 6px;
            img {
                width: 100%;
                object-fit: cover;
            }
        }
    }
    .list {
        align-items: center;
        .item {
            font-weight: 500;
            font-size: 17px;
            margin: 0 10px;
            padding: 10px 6px;
            user-select: none;
            &:hover {
                cursor: pointer;
                color: var(--color-primary);
            }
            &.active {
                color: var(--color-primary);
            }
        }
    }
    .options {
        align-items: center;
        .option {
            & + .option {
                margin-left: 6px;
            }
        }

        .account {
            position: relative;

            .drop-down-select {
                position: absolute;
                top: 110%;
                left: -50%;
                box-shadow: 0 6px 6px rgba(0, 0, 0, 0.05);
                border-radius: 4px;
                display: none;
                li {
                    list-style-type: none;
                    width: 124px;
                    background: var(--color-background);
                    padding: 10px 5px 10px 10px;

                    &:hover {
                        background: var(--color-warning);
                        a {
                            color: #fff;
                        }
                    }
                }
                &.active {
                    display: block;
                }
            }
        }
    }
}
</style>
