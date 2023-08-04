import api from "../../api";

async function CreateRoomGameService( userId ){
  try{
    return await api.post('create-game', {
      userId
    })
  } catch (error) {
    return error
  }
}

export default CreateRoomGameService