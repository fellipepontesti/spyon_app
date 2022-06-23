import api from "../api";

async function RegisterService( email, senha, confirmacao ){
  try{
    return await api.post('register', {
        email,
        password: senha,
        passwordConfirmation: confirmacao
    })
  } catch (error) {
    console.log(error)
    return error
  }

}

export default RegisterService