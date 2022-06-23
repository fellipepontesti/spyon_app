import { useContext } from "react";
import { BotaoGlobal, BotaoMenuPrincipal } from "../../components/Buttons/styles";
import { ContainerGlobal } from "../../components/Container/styles";
import { TextWhite } from "../../components/Texts/styles";
import { AuthContext, INITIAL_STATE } from "../../context/auth";

export default function ScreenConfig () {
  const auth = useContext(AuthContext)


  return (
    <ContainerGlobal>
      <BotaoMenuPrincipal onPress={() => {
        auth.setUserData(INITIAL_STATE)
      }}>
        <TextWhite>Deslogar</TextWhite>
      </BotaoMenuPrincipal>
    </ContainerGlobal>
  )
}