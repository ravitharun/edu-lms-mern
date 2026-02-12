import axios from "axios"
import { Header_Token_expry, UserName } from "../../../Apis/Islogin"

export const GetClassList = async () => {
    console.log(UserName)
 const response = await axios.get(
  `http://localhost:5001/api/classlist/get`,
  {
     
    params: {
      teacher_Id: UserName.teacher_Id
    }
  }
);
    return response

}