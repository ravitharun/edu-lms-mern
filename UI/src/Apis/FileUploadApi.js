import axios from 'axios'
import { url } from './Islogin';
export const HandelUpload = async (data) => {
    try {
   
          for (let [key, vlu] of data.entries()) {
                    console.log(key, vlu,"api");
                }
                const response=await axios.post(`${url}/api/UploadResources/Upload/Materials`)
                return response
    }
    catch (err) {
        console.log(err)
        throw error
    }
}