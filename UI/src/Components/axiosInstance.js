import axios from "axios";
import { url } from "../Apis/Islogin";
import secureLocalStorage from "react-secure-storage";

const api = axios.create({
    baseURL: url,
});

// Request Interceptor
api.interceptors.request.use((config) => {
    const token = secureLocalStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Response Interceptor
api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        // Don't intercept the refresh request itself
        if (originalRequest.url === "/api/auth/refresh-token") {
            return Promise.reject(error);
        }

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const user = secureLocalStorage.getItem("User_info");
                console.log(user,'useruser');
                

                // Use axios instead of api to avoid interceptor recursion
                const response = await axios.post(
                    `${url}/api/auth/refresh-token`,
                    {
                        refreshToken: user.refreshToken,
                    }
                );

                const { accessToken, refreshToken } = response.data;

                // Save new access token
                secureLocalStorage.setItem("token", accessToken);

                // Save rotated refresh token
                user.refreshToken = refreshToken;
                secureLocalStorage.setItem("User_info", user);

                // Retry original request
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return api(originalRequest);

            } catch (err) {
                alert("tharun")
                console.log(err,'err');
                
                
                secureLocalStorage.clear();
                // window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;