import axios from "axios"

export const deactivateAccount = async(id) => {
const response=await axios.post("http://localhost:5001/api/Account/Deactivate",{id:id})
console.log(response,'response')
return response


}