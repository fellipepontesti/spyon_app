import api from "../../api"

async function UpdateRoomGameService( code ){
  try{
    return await api.get(`update-game/${code}`)
  } catch (error) {
    return error
  }
}

export default UpdateRoomGameService