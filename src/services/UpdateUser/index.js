import api from "../api";

async function UpdateUserService(data){
  try{
    return await api.post('updateUser', {data})
  } catch (error) {
    return error.response.data
  }

}

export default UpdateUserService