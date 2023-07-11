import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes"

const ListaParticipantes = () => {
  const participantes: string[] = useListaDeParticipantes()
  return(
    <ul>
      {participantes.map(participantes => <li key={participantes}>{participantes}</li>)}
    </ul>
  )
}

export default ListaParticipantes