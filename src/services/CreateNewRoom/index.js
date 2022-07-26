import api from "../api";

async function CreateRoomGameService( codeRoom ){
  try{
    return await api.post('createRoom', {
      codeRoom
    })
  } catch (error) {
    return error
  }
}

export default CreateRoomGameService