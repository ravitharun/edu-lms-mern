import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import { handleLogout, url, UserName } from "../Apis/Islogin";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const LogoutPoup = ({ onLogout, onClose }) => {
    const redirect = useNavigate()
    const onContinue = async () => {


        try {
            const response = await axios.post(`${url}/api/auth/refresh-token`, { refreshToken: UserName.refreshToken, id: UserName._id })

            
            secureLocalStorage.setItem("token", response.data.token)
            secureLocalStorage.setItem("User_info", response.data.user)
            console.log(response);
            if(response.status==200){

                 alert(response.data.message)
                 return
            }


        } catch (error) {
            // console.log(error, 'err');

            const status = error.response?.status

            console.log({ status });

            if (status == 401) {

                return handleLogout(redirect)
            }

        }






    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Close popup"
                >
                    <IoClose size={20} />
                </button>

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-sm">
                    <HiOutlineExclamationTriangle size={28} />
                </div>

                <div className="text-center">
                    <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                        Session Expired
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                        Your login session has expired. Please logout and sign in again to access your account.
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                        onClick={onContinue}
                        className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        Continue
                    </button>

                    <button
                        onClick={() => handleLogout(redirect)}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-md transition hover:bg-emerald-700"
                    >
                        <FiLogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutPoup;