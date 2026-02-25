import axios from "axios"
import Swal from "sweetalert2"

export const deactivateAccount = async (id, action) => {
    if (!id) {
        return Swal.fire({
            icon: "error",
            title: "Something Went Wrong",
            text: "ID is missing or invalid.",
            confirmButtonColor: "#d33"
        });
    }
    Swal.fire(

        {
            title: "Activate Account?",
            html: `
    <p class="text-gray-600">
      Are you sure you want to activate this account?
    </p>
    <p class="text-sm text-gray-500 mt-2">
      The user will regain access to the system immediately.
    </p>
  `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Activate",
            cancelButtonText: "Cancel"
            // denyButtonText: ``
        })
        .then(async (result) => {
            if (result.isConfirmed) {
                if (action == 'Update') {
                    const response = await axios.put("http://localhost:5001/api/Account/UpdateDeactivate", { id: id })
                    console.log(response, 'response UpdateDeactivate')
                    if (!response.data.message.AccountStatus) {
                        Swal.fire({
                            title: "Success!",
                            html: `
    <p class="text-gray-700">
      Account has been <b class="text-green-600">activated</b> successfully.
    </p>
    <p class="text-sm text-gray-500 mt-2">
      The user can now access the system.
    </p>
  `,
                            icon: "success",
                            confirmButtonColor: "#16a34a",
                            confirmButtonText: "OK"
                        });
                        setTimeout(() => {
                            window.location.reload(true);
                        }, 2500);
                    }
                    return response

                }
                else {
                    const response = await axios.post("http://localhost:5001/api/Account/Deactivate", { id: id })
                    console.log(response, 'response Deactivate')
                    if (response.data.message === 'ok') {
                        Swal.fire({
                            title: "Success!",
                            html: `
    <p class="text-gray-700">
      Account has been <b class="text-red-600">Deactivated</b> successfully.
    </p>
    <p class="text-sm text-gray-500 mt-2">
      The user can't access the system.
    </p>
  `,
                            icon: "success",
                            confirmButtonColor: "#16a34a",
                            confirmButtonText: "OK"
                        });
                        setTimeout(() => {
                            window.location.reload(true);
                        }, 2500);
                    }

                }


            }

            else if (result.isDenied) {
                Swal.fire(
                    "Cancelled",
                    "The action has been cancelled.",
                    "info"
                );
            }
        });

}



// if (action == 'Update') {
//     const response = await axios.put("http://localhost:5001/api/Account/UpdateDeactivate", { id: id })
//     console.log(response, 'response')

// }
// else {
//     const response = await axios.post("http://localhost:5001/api/Account/Deactivate", { id: id })
//     console.log(response, 'response')
//     return response
// }




