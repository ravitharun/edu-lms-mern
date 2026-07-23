

import api from "../../Components/axiosInstance";

export const GetallSubjects = async (data) => {
    try {
        const res = await api.get(`/api/AssignSubjects/get/subjects/${data}`);
        return res
    } catch (error) {
        throw error
    }
};