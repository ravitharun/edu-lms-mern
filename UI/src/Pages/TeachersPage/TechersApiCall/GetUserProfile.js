import axios from "axios"
import { UserName, Header_Token_expry, UserLogin } from "../../../Apis/Islogin"

const GetUserProfile = async (page) => {
  const response_UserProfile = await axios.get(
    "http://localhost:5001/api/Profile/Get",
    {
      params: {
        userid:
          UserName.role === "student"
            ? UserName.Student_ID
            : UserName.teacher_Id || "1",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${UserLogin}`,
      },
    }
  );


  return response_UserProfile
}


export default GetUserProfile