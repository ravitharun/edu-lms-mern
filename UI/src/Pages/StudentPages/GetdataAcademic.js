import axios from "axios"

export const Getdata = () => {
    const response = axios.get
        ("http://localhost:5001/api/Academic/get/AcademicDetails")
    console.log(response, "Response For The Academic Event.")
    return response;
}