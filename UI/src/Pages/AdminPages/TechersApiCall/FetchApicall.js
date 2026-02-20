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
// export const GetstudentsProfile = async () => {
//   console.log(UserName.teacher_Id)
//   try {
//     const response = await axios.get("http://localhost:5001/api/classlist/getstudents", {
//       params: {
//         id: UserName.teacher_Id
//       }, Header_Token_expry
//     })
//     console.log(response, 'response')
//     return response
//   } catch (error) {
//     console.log(error)

//   }
// }