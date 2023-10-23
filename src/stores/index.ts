import { ref } from "vue";
import { createStore } from "vuex";
import { SET_LOADING } from "./storeConstants";
interface IAuthData {
    userId: string;
    username: string;
    email: string;
}
interface IRootState {
    isLoading: boolean;
    authData: IAuthData;
}
export default createStore<IRootState>({
    state: {
        authData: ref<IAuthData>({
            userId: "",
            username: "",
            email: "",
        }),
        isLoading: ref<boolean>(false),
    },
    getters: {},
    mutations: {
        toggleLoading(state: IRootState, isOpen: boolean) {
            state.isLoading = isOpen;
        },
    },
    actions: {
        [SET_LOADING]({ commit }: any, isOpen: boolean) {
            commit("toggleLoading", isOpen);
        },
    },
    modules: {},
});
