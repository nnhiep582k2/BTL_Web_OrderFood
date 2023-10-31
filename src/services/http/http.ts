import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const axiosInstance = axios.create({
    baseURL: "https://localhost:7276/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const getJwtToken = () => {
    return localStorage.getItem("jwtToken");
};

axiosInstance.interceptors.request.use(
    (config) => {
        const jwtToken = getJwtToken();
        if (jwtToken) {
            config.headers["Authorization"] = `Bearer ${jwtToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (resp) => resp,
    async (error) => {
        if (error.response.status === 401) {
            // Chuyển hướng đến trang đăng nhập
            router.push({ path: "/login" });
        } else if (error.response.status === 403) {
            // Xử lý trường hợp không có quyền ở đây (nếu cần)
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
