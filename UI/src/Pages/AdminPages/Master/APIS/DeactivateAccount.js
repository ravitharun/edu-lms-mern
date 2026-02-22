import axios from "axios"

export const deactivateAccount = async (id, action) => {
    if (action == 'Update') {
        const response = await axios.put("http://localhost:5001/api/Account/UpdateDeactivate", { id: id })
        console.log(response, 'response')

    }
    else {
        const response = await axios.post("http://localhost:5001/api/Account/Deactivate", { id: id })
        console.log(response, 'response')
        return response
    }

}