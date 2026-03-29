import axios from "axios"

export const Getdata =async () => {
    const response = await axios.get
        ("http://localhost:5001/api/Academic/get/AcademicDetails")
    return response;
}