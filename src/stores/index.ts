import {
    LOGIN_ACTION,
    SET_AUTH_DATA_ACTION,
    SET_LOADING,
} from './storeConstants';
import { ref } from 'vue';
import { createStore } from 'vuex';
import { notify } from '@/services/Toast';
import { TypeToast } from '@/enums/TypeToast';
import http from '@/services/http/http';

interface IAuthData {
    userId: string;
    fullName: string;
    email: string;
    token: string;
}
interface IRootState {
    isLoading: boolean;
    authData: IAuthData;
}

export default createStore<IRootState>({
    state: {
        authData: ref<IAuthData>({
            userId: '',
            fullName: '',
            email: '',
            token: '',
        }),
        isLoading: ref<boolean>(false),
    },
    getters: {
        getAuthData: (state: any) => {
            return state.authData;
        },
    },
    mutations: {
        toggleLoading(state: IRootState, isOpen: boolean) {
            state.isLoading = isOpen;
        },
        [SET_AUTH_DATA_ACTION](state: any, data: any) {
            const newAuthData = {
                userId: data?.userId,
                fullName: data?.fullName,
                email: data?.email,
                token: data?.token,
            };
            state.authData = newAuthData;
        },
    },
    actions: {
        [SET_LOADING]({ commit }: any, isOpen: boolean) {
            commit('toggleLoading', isOpen);
        },

        async [LOGIN_ACTION]({ commit }: any, payload: object) {
            try {
                const { data } = await http.post(
                    '/Auth/login',
                    JSON.stringify(payload)
                );
                if (data.success) {
                    commit(SET_AUTH_DATA_ACTION, data.data);
                }
            } catch (error: any) {
                notify(`${error?.response?.data?.message}`, TypeToast.error);
            }
        },
    },
    modules: {},
});
