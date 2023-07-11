import { useRecoilValue, useSetRecoilState} from 'recoil'
import { erroState, listaParticipantesState } from "../atom"

export const useAdicionarParticipante = () => {
  const setLista = useSetRecoilState(listaParticipantesState)  //método apenas setter, sem renderizar novamente
  const lista = useRecoilValue(listaParticipantesState)
  const setErro = useSetRecoilState(erroState)

  return (nomeDoParticipante: string) => {
    if(lista.includes(nomeDoParticipante)) {
      setErro('Nomes duplicados não são permitidos!')
      setTimeout(() => {
        setErro('')
      }, 5000)
      return
    }

    return setLista(listaAtual => [...listaAtual, nomeDoParticipante])
  }
} 