import axios from 'axios'
import { url } from './Islogin';
export const HandelUpload = async (data) => {
    try {
        // console.log(data,'data')
        const res = await axios.post(`${url}/api/UploadResources/Upload/Materials`, data, {
            headers: {
                Accept: "application/json",
            },
        });
        return res
    }
    catch (err) {
        console.log(err)
        throw err
    }
}