import { realizarSorteio } from "./realizarSorteio"

describe('dado um sorteio de amigo secreto', () => {
  test('cada participante não sorteie o próprio nome', () => {
    //ARANGE
    const participantes = ['Ana', 'Catarina', 'Josefina', 'Joel', 'Juliana', 'João']
    //ACT
    const sorteio = realizarSorteio(participantes)
    //ASSERT
    participantes.forEach(participante => {
      const amigoSecreto = sorteio.get(participante)
      expect(amigoSecreto).not.toEqual(participante)
     })
  })
})