import axios from "axios"
import Swal from "sweetalert2"
import { url, UserName } from "../../../Apis/Islogin";
export const deactivateAccount = async (id, action) => {
    if (!id) {
        await Swal.fire({
            icon: "error",
            title: "Something Went Wrong",
            text: "ID is missing or invalid.",
            confirmButtonColor: "#d33"
        });
        return null;
    }

    const result = await Swal.fire({
        title: action === "Update" ? "Activate Account" : "Deactivate Account",
        html: `
            <p class="text-gray-600">
              Are you sure you want to ${action === "Update" ? "activate" : "deactivate"} this account?
            </p>
            <p class="text-sm text-gray-500 mt-2">
              ${action === "Update"
                ? "The user will regain access to the system."
                : "The user will lose access to the system."
            }
            </p>
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: action === "Update" ? "#16a34a" : "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: action === "Update" ? "Activate" : "Deactivate",
        cancelButtonText: "Cancel"
    });

    if (!result.isConfirmed) {
        return null; // user cancelled
    }

    try {
        if (action === "Update") {
            const response = await axios.put(
                `${url}/api/Account/UpdateDeactivate`,
                { id, AdminInfo: UserName }
            );

            await Swal.fire({
                title: "Success!",
                html: `<p>Account <b class="text-green-600">activated</b> successfully.</p>`,
                icon: "success"
            });

            return response;
        } else {
            const response = await axios.post(
                `${url}/api/Account/Deactivate`,
                { id, IssuedUser: UserName }
            );

            await Swal.fire({
                title: "Success!",
                html: `<p>Account <b class="text-red-600">deactivated</b> successfully.</p>`,
                icon: "success"
            });

            return response;
        }
    } catch (error) {
        await Swal.fire({
            icon: "error",
            title: "Error",
            text: error?.message || "Something went wrong"
        });
        throw error; // important for outer catch
    }
};




