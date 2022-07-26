import api from "../api";

export async function GetWalletService( userId ){
  try{
    const result = await api.get(`walletByUser/${userId}`)

    return result.data
  } catch (error) {
    console.log(error)
    return error
  }

}