import api from "../api";

async function FindRoomGameService( code, userData ){
  try{
    return await api.post('findRoom', {
      code,
      userData
    })
  } catch (error) {
    return error
  }
}

export default FindRoomGameService