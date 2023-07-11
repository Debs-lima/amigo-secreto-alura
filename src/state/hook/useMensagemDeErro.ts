import { erroState } from "../atom"
import { useRecoilValue } from 'recoil'

export const useMensagemDeErro = ()  => {
  const mensagem = useRecoilValue(erroState)
  return mensagem
}

