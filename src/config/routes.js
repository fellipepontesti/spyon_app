import React, {useContext} from "react";

import { AuthContext } from "../context/auth";
import AppRouter from "./routes/appRoutes";
import AuthRouter from "./routes/authRoutes";

export default function Router() {
  const auth = useContext(AuthContext)
  const logado = auth.userData.logado

  return logado ? <AppRouter/> : <AuthRouter/> 
}